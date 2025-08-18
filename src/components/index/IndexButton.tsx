import styles from './index.module.css';
import Link from 'next/link';

interface IndexButtonProps {
    link_url: string;
    context: string;
}

export default function IndexButton({ link_url, context }: IndexButtonProps) {
    return (
        <div className={styles.card_siderbar_button}>
            <Link href={`${link_url}`}>
                {context}
            </Link>
        </div>
    );
}
