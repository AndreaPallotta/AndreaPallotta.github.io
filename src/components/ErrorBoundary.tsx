import { Component, type ReactNode } from 'react';

export default class ErrorBoundary extends Component<{ children: ReactNode }, { hasError: boolean }> {
    state = { hasError: false };
    static getDerivedStateFromError() {
        return { hasError: true };
    }
    render() {
        if (this.state.hasError)
            return <div className="fixed inset-0 grid place-items-center text-white">Load error</div>;
        return this.props.children;
    }
}
