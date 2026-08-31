'use client';

import * as React from 'react';

type Props = { children: React.ReactNode; fallback: React.ReactNode };
type State = { hasError: boolean };

export class SceneErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch() {
    // 3D is decorative; fail silently to the fallback.
  }

  render() {
    if (this.state.hasError) return this.props.fallback;
    return this.props.children;
  }
}
