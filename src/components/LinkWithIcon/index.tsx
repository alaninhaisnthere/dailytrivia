import React, { useState } from 'react';
import Image, { StaticImageData } from 'next/image';
import Link from 'next/link';

interface LinkWithIconProps {
  href: string;
  text: string;
  icon: StaticImageData;
  hoverIcon: StaticImageData;
  width: number;
  textSize?: 'text-sm' | 'text-base' | 'text-lg' | 'text-xl' | 'text-2xl' | 'text-4xl'
}

const LinkWithIcon: React.FC<LinkWithIconProps> = ({ href, text, icon, hoverIcon, width, textSize }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="flex flex-row items-center">
      <Link
        href={href}
        className={`flex items-center justify-around tracking-wider 
                 font-unbounded space-x-2 ${textSize ? textSize : 'text-3xl'} text-black 
                 hover:animate-pulse
                 hover:text-[#043E3C] 
                 hover:scale-125 transition-transform duration-300 ease-in-out`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <span className="ml-2">{text}</span>
        <Image
          src={isHovered ? hoverIcon : icon}
          alt="Ícone"
          width={width}
        />
      </Link>
    </div>
  );
}

export default LinkWithIcon;
