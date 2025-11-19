import React, { useMemo, useState } from "react";
import { aiCheckApi } from "../api/aiCheckApi";
import { AlertCircle, Brain, CheckCircle2, Loader2 } from "lucide-react";

const accentColor = "#319795";

const VerdictBadge = ({ verdict }) => {
  const colorClass = useMemo(() => {
    if (verdict === "Likely Human-Written") return "success";
    if (verdict === "Uncertain - Mixed Content") return "warning";
    if (verdict === "Likely AI-Assisted") return "info";
    return "danger";
  }, [verdict]);
  return <span className={`badge bg-${colorClass}`}>{verdict}</span>;
};

const ProbabilityBar = ({ value }) => {
  const pct = Math.max(0, Math.min(100, value || 0));
  const bg =
    pct < 30
      ? "bg-success"
      : pct < 60
      ? "bg-warning"
      : pct < 80
      ? "bg-info"
      : "bg-danger";
  return (
    <div
      className="progress"
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={pct}
    >
      <div className={`progress-bar ${bg}`} style={{ width: `${pct}%` }}>
        {pct}%
      </div>
    </div>
  );
};

const DashboardAIChecker = () => {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState(null);

  const minChars = 50;
  const canAnalyze = text.trim().length >= minChars;

  const onAnalyze = async () => {
    setError("");
    setResult(null);
    if (!canAnalyze) {
      setError(`Please enter at least ${minChars} characters.`);
      return;
    }
    try {
      setLoading(true);
      const { data } = await aiCheckApi.checkText(text.trim());
      setResult(data);
    } catch (e) {
      const msg =
        e?.response?.data?.message ||
        e?.message ||
        "Failed to analyze the text.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-fluid px-4">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="mb-0 d-flex align-items-center gap-2">
          <Brain size={24} color={accentColor} /> AI Plagiarism Checker
        </h2>
      </div>

      <div className="row g-4">
        <div className="col-lg-8">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body">
              <label className="form-label fw-semibold">Paste your text</label>
              <textarea
                className="form-control"
                rows={10}
                placeholder="Paste or type the content to analyze..."
                value={text}
                onChange={(e) => setText(e.target.value)}
              />
              <div className="d-flex justify-content-between align-items-center mt-2">
                <small className={`text-${canAnalyze ? "muted" : "danger"}`}>
                  {text.trim().length}/{minChars} characters minimum
                </small>
                <button
                  className="btn btn-primary d-flex align-items-center gap-2"
                  style={{
                    backgroundColor: accentColor,
                    borderColor: accentColor,
                  }}
                  onClick={onAnalyze}
                  disabled={!canAnalyze || loading}
                >
                  {loading ? (
                    <Loader2 className="spin" size={18} />
                  ) : (
                    <CheckCircle2 size={18} />
                  )}
                  {loading ? "Analyzing..." : "Analyze"}
                </button>
              </div>
              {error && (
                <div
                  className="alert alert-danger d-flex align-items-center gap-2 mt-3"
                  role="alert"
                >
                  <AlertCircle size={18} />
                  <div>{error}</div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="col-lg-4">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body">
              <h5 className="card-title mb-3">Result</h5>
              {!result ? (
                <p className="text-muted mb-0">
                  Run an analysis to see results here.
                </p>
              ) : result?.status !== "success" ? (
                <div className="alert alert-warning">No results available.</div>
              ) : (
                <>
                  <div className="mb-3">
                    <div className="d-flex justify-content-between mb-1">
                      <span className="fw-semibold">AI Probability</span>
                      <span className="fw-semibold">
                        {result.aiProbability}%
                      </span>
                    </div>
                    <ProbabilityBar value={result.aiProbability} />
                  </div>
                  <div className="mb-3">
                    <span className="fw-semibold me-2">Verdict:</span>
                    <VerdictBadge verdict={result.verdict} />
                  </div>
                  <div className="mb-3">
                    <span className="fw-semibold">Suggestions</span>
                    <ul className="mt-2 mb-0">
                      {(result.suggestions || []).length === 0 ? (
                        <li className="text-muted">No suggestions.</li>
                      ) : (
                        result.suggestions.map((s, idx) => (
                          <li key={idx}>{s}</li>
                        ))
                      )}
                    </ul>
                  </div>
                  <small className="text-muted">
                    Analyzed {Math.min(1500, result.textLength)} of{" "}
                    {result.textLength} characters.
                  </small>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      <style>{`.spin{animation:spin 1s linear infinite}@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </div>
  );
};

export default DashboardAIChecker;
