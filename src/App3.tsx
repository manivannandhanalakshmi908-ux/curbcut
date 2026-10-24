import { useState } from "react";
import "./App.css";

function App() {
  const [scanned, setScanned] = useState(false);
  const [fixedIssues, setFixedIssues] = useState<number[]>([]);
  const [verifiedIssues, setVerifiedIssues] = useState<number[]>([]);
  return (
    <div className="app">
      <aside className="sidebar">
        <div className="brand">
          <span className="brand-icon">♿</span>
          <span>CurbCut</span>
        </div>
        <nav>
          <a className="nav-item active" href="#dashboard">
            ▦ Dashboard
          </a>
          <a className="nav-item" href="#sample">
            ◉ Sample Page
          </a>
          <a className="nav-item" href="#findings">
            ☷ Scan Findings
          </a>
        </nav>

        <div className="sidebar-bottom">
          <span className="status-dot" />
          Demo Environment
          <p>Accessibility made better.</p>
        </div>
      </aside>

      <main className="main-content" id="dashboard">
        <header className="topbar">
          <div>
            <p className="eyebrow">ACCESSIBILITY REPAIR ASSISTANT</p>
            <h1>Dashboard</h1>
            <p className="muted">Detect it. Fix it. Prove it.</p>
          </div>

          <button className="scan-button" onClick={() => setScanned(true)}>
            ↻ Scan Sample Page
          </button>
        </header>

        <section className="welcome-banner">
          <div>
            <p className="banner-tag">YOUR ACCESSIBILITY WORKSPACE</p>
            <h2>Make the web work for everyone.</h2>
            <p>
              Find accessibility issues, review suggested repairs, and track
              verification.
            </p>
          </div>
          <div className="banner-symbol" aria-hidden="true">
            ♿
          </div>
        </section>

        <section className="stats-grid" aria-label="Scan summary">
          <article className="stat-card">
            <div className="stat-top">
              <span>Issues Found</span>
              <span className="stat-icon blue">!</span>
            </div>
            <h2>{scanned ? "3" : "—"}</h2>
            <p>{scanned ? "Demo findings detected" : "Run a scan to begin"}</p>
          </article>

          <article className="stat-card">
            <div className="stat-top">
              <span>Verified Repairs</span>
              <span className="stat-icon green">✓</span>
            </div>
            <h2>{verifiedIssues.length}</h2>
            <p>No repairs verified yet</p>
          </article>

          <article className="stat-card">
            <div className="stat-top">
              <span>Needs Review</span>
              <span className="stat-icon orange">◷</span>
            </div>
            <h2>{scanned ? 3 - verifiedIssues.length : "—"}</h2>
            <p>{scanned ? "Review demo findings" : "Awaiting scan"}</p>
          </article>
        </section>

        <section className="panel sample-panel" id="sample">
          <div className="section-heading">
            <div>
              <p className="eyebrow">TEST WEBSITE</p>
              <h2>{scanned ? 3 - verifiedIssues.length : "—"}</h2>
            </div>
            <span className="demo-badge">DEMO</span>
          </div>

          <div className="bakery-preview">
            <div className="bakery-emoji" aria-hidden="true">
              🥐
            </div>
            <div className="bakery-copy">
              <h3>Freshly Baked, Every Day</h3>
              <p>
                Fresh bread, cakes and cookies made with care. Discover
                something delicious for every occasion.
              </p>
              <button
                className="menu-button"
                onClick={() => alert("Sample bakery menu")}
              >
                View Bakery Menu →
              </button>
            </div>
          </div>
        </section>
        <section className="panel findings-panel" id="findings">
          <div className="section-heading">
            <div>
              <p className="eyebrow">ACCESSIBILITY CHECK</p>
              <h2>Scan Findings</h2>
            </div>
            <span className={scanned ? "review-badge" : "waiting-badge"}>
              {scanned ? "3 to review" : "Not scanned"}
            </span>
          </div>

          {!scanned ? (
            <div className="empty-state">
              <div className="empty-icon">⌕</div>
              <h3>Ready to check your page?</h3>
              <p>Start a demo scan to display sample accessibility findings.</p>
              <button className="scan-button" onClick={() => setScanned(true)}>
                Run Demo Scan
              </button>
            </div>
          ) : (
            <>
              {[
                {
                  id: 1,
                  title: "Image alternative text",
                  description:
                    "An image may need descriptive alternative text.",
                },
                {
                  id: 2,
                  title: "Form field label",
                  description: "A form field may need a programmatic label.",
                },
                {
                  id: 3,
                  title: "Accessible button name",
                  description: "A button should have a clear accessible name.",
                },
              ].map((issue) => (
                <div className="finding-row" key={issue.id}>
                  <span className="finding-number">
                    {String(issue.id).padStart(2, "0")}
                  </span>

                  <div className="finding-copy">
                    <h3>{issue.title}</h3>
                    <p>{issue.description}</p>

                    {fixedIssues.includes(issue.id) && (
                      <p className="success-message">✓ Demo fix applied</p>
                    )}

                    {verifiedIssues.includes(issue.id) && (
                      <p className="success-message">
                        ✓ Demo verification passed
                      </p>
                    )}

                    <div className="issue-actions">
                      <button
                        className="fix-button"
                        disabled={fixedIssues.includes(issue.id)}
                        onClick={() =>
                          setFixedIssues((prev) => [...prev, issue.id])
                        }
                      >
                        {fixedIssues.includes(issue.id) ? "Fixed" : "Fix Issue"}
                      </button>

                      <button
                        className="verify-button"
                        disabled={
                          !fixedIssues.includes(issue.id) ||
                          verifiedIssues.includes(issue.id)
                        }
                        onClick={() =>
                          setVerifiedIssues((prev) => [...prev, issue.id])
                        }
                      >
                        {verifiedIssues.includes(issue.id)
                          ? "Verified"
                          : "Verify Fix"}
                      </button>
                    </div>
                  </div>

                  <span className="severity">
                    {verifiedIssues.includes(issue.id) ? "Verified" : "Review"}
                  </span>
                </div>
              ))}

              <p className="demo-note">
                Demo only. These findings and repair statuses are simulated, not
                results from a real accessibility scanner.
              </p>
            </>
          )}
        </section>

        <footer className="footer">
          CurbCut · Accessibility repair workspace · Hackathon demo
        </footer>
      </main>
    </div>
  );
}

export default App;
