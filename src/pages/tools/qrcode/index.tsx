import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import "./style.scss";
import QRCode from "qrcode";
import { PopupSelecter } from "../../../components/popupSelecter";

const neverGonnaGiveYouUpNeverGonnaLetYouDownNeverGonnaRunAroundAndDesertYouNeverGonnaMakeYouCryNeverGonnaSayGoodbyeNeverGonnaTellALieAndHurtYou
	= "https://www.youtube.com/watch?v=dQw4w9WgXcQ";
enum QRCodeErrorCorrectionLevel {
	L="L",
	M="M",
	Q="Q",
	H="H",
}
const dictErrorCorrectionLevel: Partial<Dictionary<string, QRCodeErrorCorrectionLevel>> = {
	L: "Low: L",
	M: "Medium: M",
	Q: "Quartile: Q",
	H: "High: H",
};

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

  useEffect(() => {
		qrCodeRenderToCanvas();
  }, [url, errorCorrectionLevel, version]);

  useEffect(() => {
		if (dictErrorCorrectionLevel[inputErrorCorrectionLevel])
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
		if (dictErrorCorrectionLevel[input as QRCodeErrorCorrectionLevel]) {
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

	/**	Create the QR Code on the canvas. Fallback to `QRCode` deciding the lowest version. */
	const qrCodeRenderToCanvas = () => {
		const text = url || neverGonnaGiveYouUpNeverGonnaLetYouDownNeverGonnaRunAroundAndDesertYouNeverGonnaMakeYouCryNeverGonnaSayGoodbyeNeverGonnaTellALieAndHurtYou;

		if (ref.current) {
			QRCode.toCanvas(ref.current, text, { errorCorrectionLevel, version, margin: 0 })
				.catch((e) => {
					/** Grab version from error message if possible */
					const v = parseInt(e.toString().replace(/\D+/g, ""));
					if (!isNaN(v) && v > 0 && v <= 40) setVersion(v);
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

  return (
    <div className="page p-qr-code">
      <h1>QR Code Generator</h1>

			<div>
				<div className="label"><code>url</code></div>
				<div className="input">
					<input name="url" onChange={handleSetUrl} type="text" value={url} />
				</div>
			</div>
			<div>
				<div className="label"><code>errorCorrectionLevel</code><small>{Object.values(dictErrorCorrectionLevel).join(", ")}</small></div>
				<div className="input">
					<input
						onClick={() => setPopupIsOpenErrorCorrectionLevel(true)}
						readOnly
						name="errorCorrectionLevel"
						type="text"
						value={dictErrorCorrectionLevel[inputErrorCorrectionLevel]}
					/>
				</div>
			</div>
			<div>
				<div className="label"><code>version</code><small>1 - 40</small></div>
				<div className="input">
					<input name="version" onChange={handleInputVersion} type="number" max={40} min={1} value={inputVersion} />
				</div>
			</div>

			<h6>{url}</h6>
			<h6>Error Correction Level: {errorCorrectionLevel}</h6>
			<h6>Version: {version ?? "Default to lowest"}</h6>
			<div className="button" onClick={qrCodeSaveDataUrlToFile}>Save</div>

			<main className="qr-code">
				<canvas ref={ref} />
			</main>

			<PopupSelecter
				selections={dictErrorCorrectionLevel}
				selected={inputErrorCorrectionLevel}
				isOpen={popupIsOpenErrorCorrectionLevel}
				select={handleInputErrorCorrectionLevel}
				close={() => setPopupIsOpenErrorCorrectionLevel(false)}
			/>
		</div>
  );
};
