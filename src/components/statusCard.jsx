export default function StatusCard({ title, status, message }) {
  const colors = {
    ok: 'bg-green-100 border-green-400 text-green-800',
    error: 'bg-red-100 border-red-400 text-red-800',
    checking: 'bg-yellow-100 border-yellow-400 text-yellow-800',
  };

  const dots = {
    ok: 'bg-green-500',
    error: 'bg-red-500',
    checking: 'bg-yellow-500',
  };

  return (
    <div className={`border rounded-xl p-5 ${colors[status] || colors.checking}`}>
      <div className="flex items-center gap-2 mb-1">
        <span className={`w-3 h-3 rounded-full ${dots[status] || dots.checking}`} />
        <h3 className="font-semibold text-lg">{title}</h3>
      </div>
      <p className="text-sm">{message || 'No info'}</p>
    </div>
  );
}