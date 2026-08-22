interface SectionHeaderProps {
  title: string;
}

export default function SectionHeader({
  title,
}: SectionHeaderProps) {
  return (
    <h3 className="text-xl font-semibold mb-5">
      {title}
    </h3>
  );
}