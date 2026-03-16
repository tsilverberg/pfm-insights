import React, { useId } from 'react';

interface SectionModuleProps {
  title: string;
  subtitle?: string;
  largeGap?: boolean;
  children: React.ReactNode;
}

const SectionModule: React.FC<SectionModuleProps> = ({ title, subtitle, largeGap, children }) => {
  const headingId = useId();
  return (
    <section className={`section-module${!title ? ' section-module--no-border' : ''}`} aria-labelledby={headingId}>
      <h2 id={headingId} className="section-module__title">{title}</h2>
      {subtitle && <p className="section-module__subtitle">{subtitle}</p>}
      <div className={`section-module__content${largeGap ? ' section-module__content--large-gap' : ''}`}>
        {children}
      </div>
    </section>
  );
};

export default SectionModule;
