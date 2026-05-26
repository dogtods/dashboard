import React, { Component, ErrorInfo, ReactNode } from "react";

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
  errorMsg: string;
  errorStack: string;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    errorMsg: "",
    errorStack: ""
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, errorMsg: error.toString(), errorStack: error.stack || "" };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="p-6 bg-[#2a0808] border border-red-500 rounded-lg m-6 text-white font-mono text-sm break-all h-screen overflow-auto">
          <h1 className="text-2xl font-bold text-red-500 mb-4">🚨 致命的なクラッシュが発生しました</h1>
          <p className="mb-4">原因を特定するためのエラーメッセージです。こちらをお知らせください。</p>
          <div className="bg-black/50 p-4 rounded text-red-300 mb-4">
            {this.state.errorMsg}
          </div>
          <details className="text-gray-400">
            <summary className="cursor-pointer mb-2">スタックトレース詳細 (開発者用)</summary>
            <pre className="whitespace-pre-wrap text-xs">{this.state.errorStack}</pre>
          </details>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
