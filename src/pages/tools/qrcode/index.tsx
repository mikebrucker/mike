import { observer } from "mobx-react";
import QRCode from "qrcode";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { Input } from "../../../components/input";
import { Phrase } from "../../../components/l10n";
import { PopupSelecter } from "../../../components/popupSelecter";
import { l10n } from "../../../core/l10n";
import "./style.scss";

const neverGonnaGiveYouUpNeverGonnaLetYouDownNeverGonnaRunAroundAndDesertYouNeverGonnaMakeYouCryNeverGonnaSayGoodbyeNeverGonnaTellALieAndHurtYou
	= "https://www.youtube.com/watch?v=dQw4w9WgXcQ";
enum QRCodeErrorCorrectionLevel {
	L = "L",
	M = "M",
	Q = "Q",
	H = "H",
}

interface PopupErrorCorrectionLevelProps {
	inputErrorCorrectionLevel?: string;
	popupIsOpenErrorCorrectionLevel?: boolean;
	handleInputErrorCorrectionLevel: (s: string) => void;
	close: () => void;
}
/** PopupSelector needs to observe dictionary values */
const PopupErrorCorrectionLevel = observer(
	({
		inputErrorCorrectionLevel,
		popupIsOpenErrorCorrectionLevel,
		handleInputErrorCorrectionLevel,
		close
	}: PopupErrorCorrectionLevelProps) => {
		const dictErrorCorrectionLevel = Object.values(QRCodeErrorCorrectionLevel).reduce((acc, cur) => {
			acc[cur] = l10n.getString(`tools.qrcode.input.errorCorrectionLevel.${cur}`);
			return acc;
		}, {} as Partial<Dictionary<string, QRCodeErrorCorrectionLevel>>);
		return (
			<PopupSelecter
				selections={dictErrorCorrectionLevel}
				selected={inputErrorCorrectionLevel}
				isOpen={popupIsOpenErrorCorrectionLevel}
				select={handleInputErrorCorrectionLevel}
				close={close}
			/>
		);
	});

interface InputErrorCorrectionLevelProps {
	onClick: () => void;
	errorCorrectionLevel: QRCodeErrorCorrectionLevel;
}
/** `input` needs to observe language to change it's value */
const InputErrorCorrectionLevel = observer(({ onClick, errorCorrectionLevel }: InputErrorCorrectionLevelProps) => {
	const errorCorrectionLevelDesc = (
		<small>
			{
				Object.values(QRCodeErrorCorrectionLevel).map((l, i, arr) => {
					return (
						<span key={`qrcode-desc-${l}`}>
							<Phrase>tools.qrcode.input.errorCorrectionLevel.{l}</Phrase>
							{i !== arr.length - 1 ? <>,&nbsp;</> : undefined}
						</span>
					);
				})
			}
		</small>
	);
	return (
		<Input
			name="errorCorrectionLevel"
			value={l10n.getString(`tools.qrcode.input.errorCorrectionLevel.${errorCorrectionLevel}`)}
			type="text"
			label="tools.qrcode.input.errorCorrectionLevel.label"
			desc={errorCorrectionLevelDesc}
			onClick={onClick}
		/>
	);
});

/** Qr Code Generator */
export const QrCodeGenerator = () => {
	const ref = useRef<HTMLCanvasElement>(null);

	const [url, setUrl] = useState(neverGonnaGiveYouUpNeverGonnaLetYouDownNeverGonnaRunAroundAndDesertYouNeverGonnaMakeYouCryNeverGonnaSayGoodbyeNeverGonnaTellALieAndHurtYou);

	const [inputErrorCorrectionLevel, setInputErrorCorrectionLevel] =
		useState<QRCodeErrorCorrectionLevel>(QRCodeErrorCorrectionLevel.H);
	const [errorCorrectionLevel, setErrorCorrectionLevel] = useState<QRCodeErrorCorrectionLevel>(QRCodeErrorCorrectionLevel.H);
	const [popupIsOpenErrorCorrectionLevel, setPopupIsOpenErrorCorrectionLevel] = useState(false);

	const [inputVersion, setInputVersion] = useState<number | undefined>(1);
	const [version, setVersion] = useState<number | undefined>(1);
	const [useLowestVersion, setUseLowestVersion] = useState(true);

	useEffect(() => {
		qrCodeRenderToCanvas();
	}, [url, errorCorrectionLevel, version]);

	useEffect(() => {
		if (QRCodeErrorCorrectionLevel[inputErrorCorrectionLevel])
			setErrorCorrectionLevel(QRCodeErrorCorrectionLevel[inputErrorCorrectionLevel]);
	}, [inputErrorCorrectionLevel]);

	useEffect(() => {
		if (inputVersion) setVersion(inputVersion);
	}, [inputVersion]);

	/** Change url directly */
	const handleSetUrl = (e: ChangeEvent<HTMLInputElement>) => {
		setUrl(e.target.value);
	};

	/** Allow useEffect to handle `errorCorrectionLevel` */
	const handleInputErrorCorrectionLevel = (input: string) => {
		if (QRCodeErrorCorrectionLevel[input as QRCodeErrorCorrectionLevel]) {
			setInputErrorCorrectionLevel(input as QRCodeErrorCorrectionLevel);
		}
		setPopupIsOpenErrorCorrectionLevel(false);
	};

	/** Allow useEffect to handle `version` */
	const handleInputVersion = (e: ChangeEvent<HTMLInputElement>) => {
		const v = parseInt(e.target.value);
		if (isNaN(v))
			setInputVersion(undefined);
		else if (v > 0 && v <= 40)
			setInputVersion(v);
	};

	/** Make QrCode Lowest Version allowed */
	const handleUseLowestVersion = () => {
		const bool = !useLowestVersion;
		setUseLowestVersion(!useLowestVersion);
		if (bool) setInputVersion(1);
	};

	/**	Create the QR Code on the canvas. Fallback to `QRCode` deciding the lowest version. */
	const qrCodeRenderToCanvas = () => {
		const text = url || neverGonnaGiveYouUpNeverGonnaLetYouDownNeverGonnaRunAroundAndDesertYouNeverGonnaMakeYouCryNeverGonnaSayGoodbyeNeverGonnaTellALieAndHurtYou;

		if (ref.current) {
			if (useLowestVersion) {
				const { version } = QRCode.create(text, { errorCorrectionLevel });
				setInputVersion(version);
			}
			QRCode.toCanvas(
				ref.current,
				text,
				{ version: useLowestVersion ? 1 : version, errorCorrectionLevel, margin: 0 }
			).catch((e) => {
				/** Grab version from error message if possible */
				const v = parseInt(e.toString().replace(/\D+/g, ""));
				if (!isNaN(v) && v > 0 && v <= 40) {
					setVersion(v);
					if (useLowestVersion) setInputVersion(v);
				}
				QRCode.toCanvas(ref.current, text, { errorCorrectionLevel, margin: 0 });
			});
		}
	};

	/**	Download Qr Code. */
	const qrCodeSaveDataUrlToFile = async () => {
		const text = url || neverGonnaGiveYouUpNeverGonnaLetYouDownNeverGonnaRunAroundAndDesertYouNeverGonnaMakeYouCryNeverGonnaSayGoodbyeNeverGonnaTellALieAndHurtYou;

		if (ref.current) {
			const dataUrl = await QRCode.toDataURL(ref.current, text, { errorCorrectionLevel, version, margin: 0 });
			const a = document.createElement("a");
			a.href = dataUrl;
			a.download = `qr-code-${Date.now()}.png`;
			a.click();
		}
	};

	const versionFuncButton = (
		<code className="use-lowest-version" onClick={handleUseLowestVersion}>
			<small>
				<span className="checkbox">
					<div>
						{useLowestVersion ? String.fromCodePoint(0x2714) : <>&nbsp;</>}
					</div>
				</span>
				<Phrase>tools.qrcode.input.version.func</Phrase>
			</small>
		</code>
	);

	return (
		<div className="page p-qr-code">
			<h1><Phrase>tools.qrcode.title</Phrase></h1>

			<Input
				name="url"
				value={url}
				type="text"
				label="tools.qrcode.input.url.label"
				desc="tools.qrcode.input.url.desc"
				onChange={handleSetUrl}
			/>
			<InputErrorCorrectionLevel
				onClick={() => setPopupIsOpenErrorCorrectionLevel(true)}
				errorCorrectionLevel={inputErrorCorrectionLevel}
			/>
			<Input
				name="version"
				value={inputVersion}
				type="number"
				label="tools.qrcode.input.version.label"
				desc="tools.qrcode.input.version.desc"
				max={40}
				min={1}
				onChange={handleInputVersion}
				funcButton={versionFuncButton}
			/>

			<h6>{url}</h6>
			<h6><Phrase>tools.qrcode.info.errorCorrectionLevel</Phrase>: {errorCorrectionLevel}</h6>
			<h6><Phrase>tools.qrcode.info.version</Phrase>: {version ?? <Phrase>tools.qrcode.info.versionDefault</Phrase>}</h6>
			<div className="button" onClick={qrCodeSaveDataUrlToFile}><Phrase>common.save</Phrase></div>

			<main className="qr-code">
				<canvas ref={ref} />
			</main>

			<PopupErrorCorrectionLevel
				inputErrorCorrectionLevel={inputErrorCorrectionLevel}
				popupIsOpenErrorCorrectionLevel={popupIsOpenErrorCorrectionLevel}
				handleInputErrorCorrectionLevel={handleInputErrorCorrectionLevel}
				close={() => setPopupIsOpenErrorCorrectionLevel(false)}
			/>
		</div>
	);
};
