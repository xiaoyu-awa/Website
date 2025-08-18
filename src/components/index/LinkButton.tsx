import styles from './index.module.css';
import Link from 'next/link';
import Image from "next/image";

interface IndexButtonProps {
    link_url: string;
    icon: string;
}

export default function IndexButton({ link_url, icon }: IndexButtonProps) {
    return (
        <Link href={`${link_url}`}>
            <Image 
                src={icon}
                alt={`link to ${link_url}`}
                width={64}
                height={64}
            />
        </Link>
    );
}
