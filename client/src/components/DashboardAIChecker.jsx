import React, { useState } from "react";
import { aiCheckApi } from "../api/aiCheckApi";
import { AlertCircle, Brain, Loader2 } from "lucide-react";

const accentColor = "#319795";

const DashboardAIChecker = () => {
  // File upload / plagiarism states only
  const [file, setFile] = useState(null);
  const [fileLoading, setFileLoading] = useState(false);
  const [fileError, setFileError] = useState("");
  const [plagiarismResult, setPlagiarismResult] = useState(null);

  const allowedTypes = [
    "text/plain",
    "application/pdf",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ];

  const handleFileChange = (e) => {
    setFileError("");
    setPlagiarismResult(null);
    const f = e.target.files?.[0] || null;
    if (f) {
      // Basic MIME/type validation and extension fallback
      const okType =
        allowedTypes.includes(f.type) ||
        f.name?.toLowerCase().endsWith(".docx") ||
        f.name?.toLowerCase().endsWith(".txt") ||
        f.name?.toLowerCase().endsWith(".pdf");
      if (!okType) {
        setFile(null);
        setFileError("Invalid file type. Upload .txt, .pdf or .docx files.");
        return;
      }
    }
    setFile(f);
  };

  const onUpload = async () => {
    setFileError("");
    setPlagiarismResult(null);
    if (!file) {
      setFileError("Please select a file to upload.");
      return;
    }
    try {
      setFileLoading(true);
      const { data } = await aiCheckApi.uploadDocument(file);
      console.log("Plagiarism check result:", data);
      setPlagiarismResult(data);
    } catch (e) {
      const msg = e?.message || "Failed to upload file.";
      setFileError(
        msg.includes("413") ? "File too large or API limit reached." : msg
      );
    } finally {
      setFileLoading(false);
    }
  };

  return (
    <div className="container-fluid px-4" style={{ maxWidth: "100%" }}>
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="mb-0 d-flex align-items-center gap-2">
          <Brain size={24} color={accentColor} /> AI Plagiarism Checker
        </h2>
      </div>

      <div className="row g-4">
        <div className="col-12">
          <div className="card border-0 shadow-sm w-100">
            <div className="card-body">
              <h5 className="card-title mb-3">Upload Document</h5>
              <div className="mb-3">
                <input
                  type="file"
                  accept=".txt,application/pdf,.docx"
                  onChange={handleFileChange}
                  className="form-control"
                />
              </div>
              <button
                className="btn btn-primary d-flex align-items-center gap-2"
                style={{
                  backgroundColor: accentColor,
                  borderColor: accentColor,
                }}
                onClick={onUpload}
                disabled={!file || fileLoading}
              >
                {fileLoading ? <Loader2 className="spin" size={18} /> : null}
                {fileLoading ? "Processing..." : "Upload & Check"}
              </button>
              {fileError && (
                <div
                  className="alert alert-danger d-flex align-items-center gap-2 mt-3"
                  role="alert"
                >
                  <AlertCircle size={18} />
                  <div>{fileError}</div>
                </div>
              )}
              <hr className="my-4" />
              <h5 className="card-title mb-3">Plagiarism Result</h5>
              {plagiarismResult ? (
                <>
                  <div className="mb-3">
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <div>
                        <div className="fw-semibold">Overall Score</div>
                        <div className="h3 mb-0">
                          {plagiarismResult.overallScore}
                        </div>
                      </div>
                      <div>
                        <span
                          className={`badge ${
                            plagiarismResult.is_plagiarized
                              ? "bg-danger"
                              : "bg-success"
                          }`}
                        >
                          {plagiarismResult.isPlagiarised
                            ? "Plagiarized"
                            : "Clear"}
                        </span>
                      </div>
                    </div>
                    <small className="text-muted">
                      Source matches shown per paragraph below.
                    </small>
                  </div>

                  <div className="mb-3">
                    <div className="fw-semibold mb-2">Paragraphs</div>
                    {(plagiarismResult.detailedResults || []).length === 0 ? (
                      <div className="text-muted">
                        No paragraph-level matches found.
                      </div>
                    ) : (
                      plagiarismResult.detailedResults.map((p, idx) => {
                        let maxSim = p.maxSimilarity.split("%").join("");
                        const sim = Math.round(maxSim || 0);
                        const bgClass =
                          sim >= 75
                            ? "bg-danger text-white"
                            : sim >= 50
                            ? "bg-warning"
                            : sim >= 25
                            ? "bg-info"
                            : "bg-success";
                        return (
                          <div
                            key={idx}
                            className="mb-3 p-2 rounded"
                            style={{ border: "1px solid #e9ecef" }}
                          >
                            <div
                              className={`p-2 mb-2 ${bgClass}`}
                              style={{ borderRadius: 6 }}
                            >
                              <div className="d-flex justify-content-between align-items-start">
                                <div style={{ whiteSpace: "pre-wrap" }}>
                                  {p.paragraph || "(no text)"}
                                </div>
                                <div className="ms-2 text-end">
                                  <div className="fw-semibold">
                                    Max: {maxSim}%
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div>
                              <div className="fw-semibold mb-1">Matches</div>
                              {(p.matches || []).length === 0 ? (
                                <div className="text-muted">No matches.</div>
                              ) : (
                                <ul className="mb-0">
                                  {p.matches.map((m, i) => (
                                    <li key={i}>
                                      <a
                                        href={m.link}
                                        target="_blank"
                                        rel="noreferrer"
                                      >
                                        {m.title || m.link}
                                      </a>
                                      <span className="ms-2 badge bg-secondary">
                                        {Math.round(
                                          m.similarity.split("%").join("") || 0
                                        )}
                                        %
                                      </span>
                                    </li>
                                  ))}
                                </ul>
                              )}
                            </div>
                          </div>
                        );
                      })
                    )}
                  </div>
                  <small className="text-muted">
                    Analyzed{" "}
                    {plagiarismResult.textLength ||
                      plagiarismResult.totalChars ||
                      0}{" "}
                    characters.
                  </small>
                </>
              ) : (
                <p className="text-muted mb-0">
                  Upload a document to see plagiarism results.
                </p>
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
