interface SectionCardProps {
  title: string;
  children: React.ReactNode;
}

export default function SectionCard({
  title,
  children,
}: SectionCardProps) {
  return (
    <section className="border rounded-xl p-5 mb-6">

      <h2 className="text-xl font-semibold mb-4">
        {title}
      </h2>

      {children}

    </section>
  );
}