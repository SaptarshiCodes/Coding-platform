function OutputPanel({ output }) {
  return (
    <div className="h-full bg-base-100 flex flex-col">
      <div className="px-4 py-2 bg-base-200 border-b border-base-300 font-semibold text-sm">
        Output
      </div>

      <div className="flex-1 overflow-auto p-4">
        {output === null ? (
          <p className="text-base-content/50 text-sm">
            Click "Run Code" to see the output here...
          </p>
        ) : output.success ? (
          <div className="space-y-4">
            <div className="rounded-lg border border-success/30 bg-success/10 p-4">
              <h2 className="text-success font-bold text-lg">
                ✓ Accepted
              </h2>

              <p className="text-sm mt-1 text-base-content/80">
                All test cases passed successfully.
              </p>
            </div>

            <div className="rounded-lg border border-base-300 bg-base-200 p-3">
              <h3 className="font-semibold mb-2">
                Output
              </h3>

              <pre className="text-sm font-mono whitespace-pre-wrap">
                {output.output}
              </pre>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="rounded-lg border border-error/30 bg-error/10 p-4">
              <h2 className="text-error font-bold text-lg">
                ✗ Wrong Answer
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="rounded-lg border border-base-300 bg-base-200 p-3">
                <h3 className="font-semibold mb-2">
                  Expected Output
                </h3>

                <pre className="text-sm font-mono whitespace-pre-wrap">
                  {output.expected || "Not Available"}
                </pre>
              </div>

              <div className="rounded-lg border border-base-300 bg-base-200 p-3">
                <h3 className="font-semibold mb-2">
                  Your Output
                </h3>

                <pre className="text-sm font-mono whitespace-pre-wrap">
                  {output.output || "No Output"}
                </pre>
              </div>
            </div>

            {output.error && (
              <div className="rounded-lg border border-error/30 bg-error/10 p-3">
                <h3 className="font-semibold text-error mb-2">
                  Error
                </h3>

                <pre className="text-sm font-mono whitespace-pre-wrap text-error">
                  {output.error}
                </pre>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default OutputPanel;