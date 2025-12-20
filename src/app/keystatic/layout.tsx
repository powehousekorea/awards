export default function KeystaticLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <style>{`
        body {
          background: #141211 !important;
          color: #e8e4e0 !important;
        }
        /* Keystatic 다크 테마 */
        [data-keystatic-root] {
          --ks-background: #141211;
          --ks-surface: #1a1512;
          --ks-border: #302820;
          --ks-text: #e8e4e0;
          --ks-text-muted: #a09590;
        }
        /* 헤더/푸터 숨기기 */
        header, footer {
          display: none !important;
        }
      `}</style>
      <div className="fixed inset-0 z-50">
        {children}
      </div>
    </>
  );
}
