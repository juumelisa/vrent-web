"use client";
type MyButtonProps = {
  onClick: () => void
  children: React.ReactNode
}

export default function Button({onClick, children}: MyButtonProps) {
  
  return (
    <button
      onClick={onClick}
      className="w-full bg-blue-900 text-white rounded px-5 py-3 cursor-pointer"
    >
      {children}
    </button>
  );
}
