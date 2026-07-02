import { Component } from "react";

class AppErrorBoundary extends Component {
  state = { error: null };

  static getDerivedStateFromError(error) {
    return { error };
  }

  resetSession = () => {
    localStorage.removeItem("zfh_token");
    localStorage.removeItem("zfh_user");
    localStorage.removeItem("zfh_cart");
    window.location.href = "/";
  };

  render() {
    if (!this.state.error) return this.props.children;

    return (
      <main className="grid min-h-[70vh] place-items-center px-4 py-16 text-center">
        <div className="royal-panel max-w-xl p-8">
          <p className="text-sm font-bold uppercase tracking-[0.24em] text-gold">Something blocked the page</p>
          <h1 className="mt-3 font-display text-3xl text-white">Please reset browser data</h1>
          <p className="mt-4 text-white/70">A saved browser session or cart value may be broken. Resetting only clears this restaurant site's local data.</p>
          <button type="button" className="btn-gold mt-6" onClick={this.resetSession}>Reset and reload</button>
          <p className="mt-4 break-words text-xs text-white/45">{this.state.error.message}</p>
        </div>
      </main>
    );
  }
}

export default AppErrorBoundary;
