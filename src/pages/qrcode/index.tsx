import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import "./style.scss";
import QRCode, { QRCodeErrorCorrectionLevel } from "qrcode";

const neverGonnaGiveYouUpNeverGonnaLetYouDownNeverGonnaRunAroundAndDesertYouNeverGonnaMakeYouCryNeverGonnaSayGoodbyeNeverGonnaTellALieAndHurtYou
	= "https://www.youtube.com/watch?v=dQw4w9WgXcQ";
const dictErrorCorrectionLevel: Record<QRCodeErrorCorrectionLevel, QRCodeErrorCorrectionLevel> = {
	L: "L",
	M: "M",
	Q: "Q",
	H: "H",
	low: "low",
	medium: "medium",
	quartile: "quartile",
	high: "high",
};

/** Qr Code Generator */
export const QrCodeGenerator = () => {
	const ref = useRef<HTMLCanvasElement>(null);

  const [url, setUrl] = useState("hElLowORld");
  const [inputErrorCorrectionLevel, setInputErrorCorrectionLevel] = useState<QRCodeErrorCorrectionLevel>(dictErrorCorrectionLevel.H);
  const [errorCorrectionLevel, setErrorCorrectionLevel] = useState<QRCodeErrorCorrectionLevel>(dictErrorCorrectionLevel.H);
  const [inputVersion, setInputVersion] = useState<number | undefined>(10);
  const [version, setVersion] = useState<number | undefined>(10);

  useEffect(() => {
			renderQrCode();
  }, [url, errorCorrectionLevel, version]);

  useEffect(() => {
		if (dictErrorCorrectionLevel[inputErrorCorrectionLevel]) setErrorCorrectionLevel(inputErrorCorrectionLevel);
  }, [inputErrorCorrectionLevel]);

  useEffect(() => {
		if (version) setVersion(inputVersion);
  }, [inputVersion]);

	/** Change url directly */
	const handleSetUrl = (e: ChangeEvent<HTMLInputElement>) => {
		setUrl(e.target.value);
	};

	/** Allow useEffect to handle `errorCorrectionLevel` */
	const handleInputErrorCorrectionLevel = (e: ChangeEvent<HTMLInputElement>) => {
		setInputErrorCorrectionLevel(e.target.value as QRCodeErrorCorrectionLevel);
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
	const renderQrCode = () => {
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
				<div className="label"><code>errorCorrectionLevel</code><small>low, medium, quartile, high, L, M, Q, H</small></div>
				<div className="input">
					<input name="errorCorrectionLevel" onChange={handleInputErrorCorrectionLevel} type="text" value={inputErrorCorrectionLevel} />
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

			<main className="qr-code">
				<canvas ref={ref} />
			</main>
		</div>
  );
};
