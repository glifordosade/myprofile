'use client';

import { useState } from 'react';
import { Send, CheckCircle2, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

type Errors = Partial<Record<'name' | 'email' | 'subject' | 'message', string>>;

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '', company: '' });
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');

  const validate = (): boolean => {
    const e: Errors = {};
    if (!form.name.trim()) e.name = 'Please enter your name';
    if (!emailRe.test(form.email)) e.email = 'Enter a valid email address';
    if (!form.subject.trim()) e.subject = 'Please add a subject';
    if (form.message.trim().length < 10) e.message = 'Message should be at least 10 characters';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const onChange = (field: string) => (ev: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((f) => ({ ...f, [field]: ev.target.value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const submit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    if (form.company) {
      setStatus('success');
      return;
    }
    if (!validate()) return;
    setStatus('loading');
    try {
      const res = await fetch('/api/contacts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: form.name, email: form.email, subject: form.subject, message: form.message }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Something went wrong');
      setStatus('success');
      toast.success('Message sent!', { description: "Thanks for reaching out — I'll get back to you soon." });
      setForm({ name: '', email: '', subject: '', message: '', company: '' });
    } catch (err: any) {
      setStatus('idle');
      toast.error('Failed to send', { description: err.message || 'Please try again later.' });
    }
  };

  if (status === 'success') {
    return (
      <div className="flex flex-col items-center justify-center rounded-xl border border-border bg-card p-12 text-center">
        <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-brand/10 text-brand">
          <CheckCircle2 className="h-8 w-8" />
        </div>
        <h3 className="font-display text-2xl font-semibold">Message sent!</h3>
        <p className="mt-2 max-w-sm text-muted-foreground">Thank you for getting in touch. I&apos;ll reply to your message as soon as I can.</p>
        <button type="button" onClick={() => setStatus('idle')} className="mt-6 rounded-full border border-border px-5 py-2.5 text-sm font-semibold transition-colors hover:border-brand hover:text-brand">
          Send another
        </button>
      </div>
    );
  }

  const inputBase = 'w-full rounded-lg border bg-background px-4 py-3 text-sm outline-none transition-colors focus:border-brand';

  return (
    <form onSubmit={submit} className="rounded-xl border border-border bg-card p-6 md:p-8" noValidate>
      <input type="text" name="company" value={form.company} onChange={onChange('company')} className="hidden" tabIndex={-1} autoComplete="off" aria-hidden="true" />

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-1.5 block text-sm font-medium">Name</label>
          <input id="name" value={form.name} onChange={onChange('name')} className={cn(inputBase, errors.name ? 'border-destructive' : 'border-border')} placeholder="Jane Doe" />
          {errors.name && <p className="mt-1 text-xs text-destructive">{errors.name}</p>}
        </div>
        <div>
          <label htmlFor="email" className="mb-1.5 block text-sm font-medium">Email</label>
          <input id="email" type="email" value={form.email} onChange={onChange('email')} className={cn(inputBase, errors.email ? 'border-destructive' : 'border-border')} placeholder="jane@example.com" />
          {errors.email && <p className="mt-1 text-xs text-destructive">{errors.email}</p>}
        </div>
      </div>

      <div className="mt-5">
        <label htmlFor="subject" className="mb-1.5 block text-sm font-medium">Subject</label>
        <input id="subject" value={form.subject} onChange={onChange('subject')} className={cn(inputBase, errors.subject ? 'border-destructive' : 'border-border')} placeholder="Let's work together" />
        {errors.subject && <p className="mt-1 text-xs text-destructive">{errors.subject}</p>}
      </div>

      <div className="mt-5">
        <label htmlFor="message" className="mb-1.5 block text-sm font-medium">Message</label>
        <textarea id="message" rows={6} value={form.message} onChange={onChange('message')} className={cn(inputBase, 'resize-none', errors.message ? 'border-destructive' : 'border-border')} placeholder="Tell me about your project..." />
        {errors.message && <p className="mt-1 text-xs text-destructive">{errors.message}</p>}
      </div>

      <button type="submit" disabled={status === 'loading'} data-cursor="hover" className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand px-6 py-3.5 text-sm font-semibold text-brand-foreground transition-opacity disabled:opacity-60 sm:w-auto">
        {status === 'loading' ? <><Loader2 className="h-4 w-4 animate-spin" /> Sending...</> : <><Send className="h-4 w-4" /> Send message</>}
      </button>
    </form>
  );
}
