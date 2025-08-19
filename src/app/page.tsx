import Image from "next/image";
import styles from '@/components/index/index.module.css';

import IndexButton from "@/components/index/IndexButton";
import LinkButton from "@/components/index/LinkButton";


export default function Home() {
    return (
        <div className={styles.bg}>
            <div className={styles.card}>
                <div className={styles.card_siderbar}>
                    <div className={styles.card_siderbar_title}>
                        欢迎来到筱雨的主页~
                    </div>
                    <div className={styles.card_siderbar_avatar}>
                        <Image
                            src="/avatar.jpg"
                            alt="avatar"
                            width={196}
                            height={196}
                        />
                    </div>
                    <div>
                        <IndexButton
                            link_url="/blog"
                            context="博客"
                        />
                        <IndexButton
                            link_url="#"
                            context="不知道放什么了w"
                        />
                    </div>
                    <div className={styles.card_siderbar_footer}>
                        <LinkButton
                            link_url="https://github.com/xiaoyu-awa"
                            icon="/index/github.svg"
                        />
                        <LinkButton
                            link_url="https://x.com/_xiaoyu_ovo_"
                            icon="/index/twitter.svg"
                        />
                    </div>
                </div>
                <div className={styles.card_intro}>
                    测试内容 后续替换为blog的介绍文章页面
                </div>
            </div>
        </div>
    );
}