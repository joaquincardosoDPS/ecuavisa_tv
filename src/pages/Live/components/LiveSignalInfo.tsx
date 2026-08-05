import { useMemo } from "react";
import type { EPGChannel, LiveSignal } from "@/interfaces/catalog.interface";
import styles from "./LiveSignalInfo.module.css";

interface LiveSignalInfoProps {
	signal: LiveSignal | null;
	epg?: EPGChannel[];
}

function LiveSignalInfo({ signal, epg }: LiveSignalInfoProps) {
	const currentEvent = useMemo(() => {
		if (!signal || !epg) return null;
		const channel = epg.find((ch) => ch.key_live === signal.key_live);
		if (!channel) return null;
		const now = new Date();
		return channel.events.find((ev) => {
			const begin = new Date(ev.beginTime);
			const end = new Date(ev.endTime);
			return begin <= now && end > now;
		}) ?? null;
	}, [signal, epg]);

	const title = currentEvent?.title || signal?.active_item_data?.title || signal?.name_live || null;

	if (!signal) {
		return (
			<div className={styles.noInfoContainer}>
				<span className={styles.noInfoText}>Sin informacion</span>
			</div>
		);
	}

	return (
		<div className={styles.infoContainer}>
			<div className={styles.liveBadge}>
				<span className={styles.liveDot} />
				En vivo
			</div>
			<div className={styles.infoContent}>
				{signal.name_live && (
					<p className={styles.signalName}>
						{signal.name_live}
					</p>
				)}
				<div>
					{title && <h1 className={styles.eventTitle}>{title}</h1>}
					{currentEvent && (
						<p className={styles.eventTime}>
							{new Date(currentEvent.beginTime).toLocaleDateString("es", { weekday: "long" }).replace(/^./, c => c.toUpperCase())} | {new Date(currentEvent.beginTime).toLocaleTimeString("es", { hour: "2-digit", minute: "2-digit" })} a {new Date(currentEvent.endTime).toLocaleTimeString("es", { hour: "2-digit", minute: "2-digit" })}
						</p>
					)}
				</div>
			</div>
		</div>
	);
}

export default LiveSignalInfo;
