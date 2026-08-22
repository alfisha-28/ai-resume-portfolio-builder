interface SectionTitleProps {
  title: string;
}

export default function SectionTitle({
  title,
}: SectionTitleProps) {
  return (
    <div className="mt-8 mb-4">
      <h2 className="text-sm font-bold uppercase tracking-[2px] text-gray-800">
        {title}
      </h2>

      <div className="h-[2px] bg-gray-300 mt-2 rounded-full" />
    </div>
  );
}