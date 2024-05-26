import React from 'react';
import Image, { StaticImageData } from 'next/image';

interface LinkWithIconProps {
  href: string;
  text: string;
  icon: StaticImageData;
}

const LinkWithIcon: React.FC<LinkWithIconProps> = ({ href, text, icon }) => {
  return (
    <a href={href} className="flex items-center justify-around tracking-wider 
    font-unbounded space-x-2 text-3xl text-black 
    hover:underline underline-offset-4 decoration-dotted 
    hover:scale-105 transition-transform duration-300 ease-in-out">
      <span className="ml-2">{text}</span>
      <Image
        src={icon}
        alt="Ícone"
        width={44}
        className="pt-2"
      />
    </a>
  );
}

export default LinkWithIcon;
