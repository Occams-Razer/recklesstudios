"use client";
import { useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { useLenis } from "lenis/react";
import styles from "./work.module.css";
import { playbackId, type FilmProject } from "@/app/data/projects";

const MuxPlayer = dynamic(() => import("@mux/mux-player-react"), { ssr: false });

type Props = {
  film: FilmProject | null;
  onClose: () => void;
};

/** Full player with sound and controls in a native <dialog>. */
export default function FilmDialog({ film, onClose }: Props) {
  const ref = useRef<HTMLDialogElement>(null);
  const lenis = useLenis();

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (film) {
      if (!dialog.open) dialog.showModal();
      lenis?.stop();
      document.documentElement.style.overflow = "hidden";
    } else {
      if (dialog.open) dialog.close();
      lenis?.start();
      document.documentElement.style.overflow = "";
    }
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [film, lenis]);

  const id = film ? playbackId(film.asset) : undefined;

  return (
    <dialog
      ref={ref}
      className={styles.dialog}
      onClose={onClose}
      onCancel={(e) => {
        e.preventDefault();
        onClose();
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      aria-label={film ? `${film.title}, ${film.year}` : "Film"}
      data-lenis-prevent
    >
      {film && (
        <div className={styles.dialogInner}>
          <div className={styles.dialogBar}>
            <p className={`label ${styles.dialogTitle}`}>
              {film.index} — {film.title} — {film.year}
            </p>
            <button type="button" className={`label ${styles.close}`} onClick={onClose} autoFocus>
              Close <span aria-hidden="true">×</span>
            </button>
          </div>
          <div className={styles.dialogPlayer}>
            {id && (
              <MuxPlayer
                playbackId={id}
                autoPlay
                playsInline
                streamType="on-demand"
                accentColor="#e93636"
                primaryColor="#f4f2ee"
                secondaryColor="#0a0a0a"
                metadata={{ video_title: film.title }}
                style={{ aspectRatio: "16 / 9", width: "100%" }}
              />
            )}
          </div>
        </div>
      )}
    </dialog>
  );
}
