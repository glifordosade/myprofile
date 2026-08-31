import { MongoClient } from 'mongodb'
import { v4 as uuidv4 } from 'uuid'
import { NextResponse } from 'next/server'
import { getPool, ensureContactsTable } from '@/lib/pg'

export const runtime = 'nodejs'

// MongoDB connection
let client
let db

async function connectToMongo() {
  if (!client) {
    client = new MongoClient(process.env.MONGO_URL)
    await client.connect()
    db = client.db(process.env.DB_NAME)
  }
  return db
}

// Helper function to handle CORS
function handleCORS(response) {
  response.headers.set('Access-Control-Allow-Origin', process.env.CORS_ORIGINS || '*')
  response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  response.headers.set('Access-Control-Allow-Credentials', 'true')
  return response
}

// OPTIONS handler for CORS
export async function OPTIONS() {
  return handleCORS(new NextResponse(null, { status: 200 }))
}

// Route handler function
async function handleRoute(request, { params }) {
  const { path = [] } = await params
  const route = `/${path.join('/')}`
  const method = request.method

  try {
    const db = await connectToMongo()

    // Root endpoint - GET /api/root (since /api/ is not accessible with catch-all)
    if (route === '/root' && method === 'GET') {
      return handleCORS(NextResponse.json({ message: "Hello World" }))
    }
    // Root endpoint - GET /api/root (since /api/ is not accessible with catch-all)
    if (route === '/' && method === 'GET') {
      return handleCORS(NextResponse.json({ message: "Hello World" }))
    }

    // Status endpoints - POST /api/status
    if (route === '/status' && method === 'POST') {
      const body = await request.json()
      
      if (!body.client_name) {
        return handleCORS(NextResponse.json(
          { error: "client_name is required" }, 
          { status: 400 }
        ))
      }

      const statusObj = {
        id: uuidv4(),
        client_name: body.client_name,
        timestamp: new Date()
      }

      await db.collection('status_checks').insertOne(statusObj)
      return handleCORS(NextResponse.json(statusObj))
    }

    // Status endpoints - GET /api/status
    if (route === '/status' && method === 'GET') {
      const statusChecks = await db.collection('status_checks')
        .find({})
        .limit(1000)
        .toArray()

      // Remove MongoDB's _id field from response
      const cleanedStatusChecks = statusChecks.map(({ _id, ...rest }) => rest)
      
      return handleCORS(NextResponse.json(cleanedStatusChecks))
    }

    // Contact form - POST /api/contacts (PostgreSQL primary, MongoDB fallback)
    if (route === '/contacts' && method === 'POST') {
      const body = await request.json()
      const name = (body.name || '').toString().trim()
      const email = (body.email || '').toString().trim()
      const subject = (body.subject || '').toString().trim()
      const message = (body.message || '').toString().trim()

      const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!name || !emailRe.test(email) || !subject || message.length < 10) {
        return handleCORS(NextResponse.json({ error: 'Invalid contact form data' }, { status: 400 }))
      }

      const contact = {
        id: uuidv4(),
        name: name.slice(0, 120),
        email: email.slice(0, 320),
        subject: subject.slice(0, 200),
        message: message.slice(0, 10000),
        created_at: new Date(),
      }

      const pool = getPool()
      if (pool) {
        await ensureContactsTable()
        await pool.query(
          `INSERT INTO contacts (id, name, email, subject, message) VALUES ($1, $2, $3, $4, $5)`,
          [contact.id, contact.name, contact.email, contact.subject, contact.message]
        )
        return handleCORS(NextResponse.json({ contact, storage: 'postgresql' }, { status: 201 }))
      }

      // Fallback: store in MongoDB until DATABASE_URL is configured
      await db.collection('contacts').insertOne(contact)
      return handleCORS(NextResponse.json({ contact, storage: 'mongodb-fallback' }, { status: 201 }))
    }

    // Contact form - GET /api/contacts (basic admin listing)
    if (route === '/contacts' && method === 'GET') {
      const pool = getPool()
      if (pool) {
        await ensureContactsTable()
        const result = await pool.query(
          `SELECT id, name, email, subject, message, created_at FROM contacts ORDER BY created_at DESC LIMIT 100`
        )
        return handleCORS(NextResponse.json({ contacts: result.rows, storage: 'postgresql' }))
      }
      const rows = await db.collection('contacts').find({}).sort({ created_at: -1 }).limit(100).toArray()
      const cleaned = rows.map(({ _id, ...rest }) => rest)
      return handleCORS(NextResponse.json({ contacts: cleaned, storage: 'mongodb-fallback' }))
    }

    // Route not found
    return handleCORS(NextResponse.json(
      { error: `Route ${route} not found` }, 
      { status: 404 }
    ))

  } catch (error) {
    console.error('API Error:', error)
    return handleCORS(NextResponse.json(
      { error: "Internal server error" }, 
      { status: 500 }
    ))
  }
}

// Export all HTTP methods
export const GET = handleRoute
export const POST = handleRoute
export const PUT = handleRoute
export const DELETE = handleRoute
export const PATCH = handleRoute