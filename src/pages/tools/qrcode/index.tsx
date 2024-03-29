import { observer } from "mobx-react";
import QRCode from "qrcode";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { ColorPicker } from "../../../components/colorPicker";
import { ColorPickerToggle } from "../../../components/colorPicker/toggle";
import { Input } from "../../../components/input";
import { Phrase } from "../../../components/l10n";
import { PopupSelector } from "../../../components/popupSelector";
import { l10n } from "../../../core/l10n";
import { convertHsvToRgb, convertRgbToHex } from "../../../helpers/colors";
import { preventScroll } from "../../../helpers/helper";
import "./style.scss";

const neverGonnaGiveYouUpNeverGonnaLetYouDownNeverGonnaRunAroundAndDesertYouNeverGonnaMakeYouCryNeverGonnaSayGoodbyeNeverGonnaTellALieAndHurtYou =
  "https://www.youtube.com/watch?v=dQw4w9WgXcQ";
enum QrCodeErrorCorrectionLevel {
  L = "L",
  M = "M",
  Q = "Q",
  H = "H",
}
enum QrCodeFileType {
  png = "png",
  jpg = "jpg",
  webp = "webp",
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
    close,
  }: PopupErrorCorrectionLevelProps) => {
    const dictErrorCorrectionLevel = Object.values(QrCodeErrorCorrectionLevel).reduce(
      (acc, cur) => {
        acc[cur] = l10n.getString(`tools.qrcode.input.errorCorrectionLevel.${cur}`);
        return acc;
      },
      {} as Partial<Dictionary<string, QrCodeErrorCorrectionLevel>>
    );
    return (
      <PopupSelector
        selections={dictErrorCorrectionLevel}
        selected={inputErrorCorrectionLevel}
        isOpen={popupIsOpenErrorCorrectionLevel}
        select={handleInputErrorCorrectionLevel}
        close={close}
      />
    );
  }
);

interface InputErrorCorrectionLevelProps {
  onClick: () => void;
  errorCorrectionLevel: QrCodeErrorCorrectionLevel;
}
/** `input` needs to observe language to change it's value */
const InputErrorCorrectionLevel = observer(
  ({ onClick, errorCorrectionLevel }: InputErrorCorrectionLevelProps) => {
    const errorCorrectionLevelDesc = (
      <small>
        {Object.values(QrCodeErrorCorrectionLevel).map((l, i, arr) => {
          return (
            <span key={`qrcode-desc-${l}`}>
              <Phrase>tools.qrcode.input.errorCorrectionLevel.{l}</Phrase>
              {i !== arr.length - 1 ? <>,&nbsp;</> : undefined}
            </span>
          );
        })}
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
  }
);

/** Qr Code Generator */
export const QrCodeGenerator = () => {
  const ref = useRef<HTMLCanvasElement>(null);

  const [url, setUrl] = useState(
    neverGonnaGiveYouUpNeverGonnaLetYouDownNeverGonnaRunAroundAndDesertYouNeverGonnaMakeYouCryNeverGonnaSayGoodbyeNeverGonnaTellALieAndHurtYou
  );

  const [inputErrorCorrectionLevel, setInputErrorCorrectionLevel] =
    useState<QrCodeErrorCorrectionLevel>(QrCodeErrorCorrectionLevel.H);
  const [errorCorrectionLevel, setErrorCorrectionLevel] = useState<QrCodeErrorCorrectionLevel>(
    QrCodeErrorCorrectionLevel.H
  );
  const [popupIsOpenErrorCorrectionLevel, setPopupIsOpenErrorCorrectionLevel] = useState(false);

  const [inputVersion, setInputVersion] = useState<number | undefined>(1);
  const [version, setVersion] = useState<number | undefined>(1);
  const [useLowestVersion, setUseLowestVersion] = useState(true);

  const [fileType, setFileType] = useState(QrCodeFileType.png);
  const [popupIsOpenFileType, setPopupIsOpenFileType] = useState(false);

  const [qrCodeDarkColor, setQrCodeDarkColor] = useState("#000000");
  const [qrCodeLightColor, setQrCodeLightColor] = useState("#ffffff");
  const [qrCodeDarkHsvColor, setQrCodeDarkHsvColor] = useState({ h: 0, s: 0, v: 0 });
  const [qrCodeLightHsvColor, setQrCodeLightHsvColor] = useState({ h: 0, s: 100, v: 100 });
  const [qrCodeDarkColorIsOpen, setQrCodeDarkColorIsOpen] = useState(false);
  const [qrCodeLightColorIsOpen, setQrCodeLightColorIsOpen] = useState(false);

  useEffect(() => {
    const prevent =
      popupIsOpenErrorCorrectionLevel ||
      popupIsOpenFileType ||
      qrCodeDarkColorIsOpen ||
      qrCodeLightColorIsOpen;
    preventScroll(prevent);
  }, [
    popupIsOpenErrorCorrectionLevel,
    popupIsOpenFileType,
    qrCodeDarkColorIsOpen,
    qrCodeLightColorIsOpen,
  ]);

  useEffect(() => {
    setQrCodeDarkColor(convertRgbToHex(convertHsvToRgb(qrCodeDarkHsvColor)));
  }, [JSON.stringify(qrCodeDarkHsvColor)]);

  useEffect(() => {
    setQrCodeLightColor(convertRgbToHex(convertHsvToRgb(qrCodeLightHsvColor)));
  }, [JSON.stringify(qrCodeLightHsvColor)]);

  useEffect(() => {
    qrCodeRenderToCanvas();
  }, [url, errorCorrectionLevel, version, qrCodeDarkColor, qrCodeLightColor]);

  useEffect(() => {
    if (QrCodeErrorCorrectionLevel[inputErrorCorrectionLevel])
      setErrorCorrectionLevel(QrCodeErrorCorrectionLevel[inputErrorCorrectionLevel]);
  }, [inputErrorCorrectionLevel]);

  useEffect(() => {
    if (inputVersion) setVersion(inputVersion);
  }, [inputVersion]);

  useEffect(() => {
    if (useLowestVersion) qrCodeRenderLowestVersionToCanvas();
  }, [useLowestVersion]);

  /** Change url directly */
  const handleSetUrl = (e: ChangeEvent<HTMLInputElement>) => {
    setUrl(e.target.value);
  };

  /** Allow useEffect to handle `errorCorrectionLevel` */
  const handleInputErrorCorrectionLevel = (input: string) => {
    if (QrCodeErrorCorrectionLevel[input as QrCodeErrorCorrectionLevel]) {
      setInputErrorCorrectionLevel(input as QrCodeErrorCorrectionLevel);
    }
    setPopupIsOpenErrorCorrectionLevel(false);
  };

  /** Allow useEffect to handle `version` */
  const handleInputVersion = (e: ChangeEvent<HTMLInputElement>) => {
    const v = parseInt(e.target.value);
    if (isNaN(v)) setInputVersion(undefined);
    else if (v > 0 && v <= 40) setInputVersion(v);
  };

  /** Allow useEffect to handle `errorCorrectionLevel` */
  const handleInputFileType = (type: string) => {
    if (QrCodeFileType[type as QrCodeFileType]) {
      setFileType(type as QrCodeFileType);
    }
    setPopupIsOpenFileType(false);
  };

  /**	Render the QrCode with the lowest version by choice or error */
  const qrCodeRenderLowestVersionToCanvas = () => {
    const text =
      url ||
      neverGonnaGiveYouUpNeverGonnaLetYouDownNeverGonnaRunAroundAndDesertYouNeverGonnaMakeYouCryNeverGonnaSayGoodbyeNeverGonnaTellALieAndHurtYou;

    const { version, segments } = QRCode.create(text, { errorCorrectionLevel });
    if (useLowestVersion) setInputVersion(version);
    else setVersion(version);

    QRCode.toCanvas(ref.current, segments, {
      errorCorrectionLevel,
      margin: 0,
      color: { dark: qrCodeDarkColor, light: qrCodeLightColor },
    });
  };

  /**	Create the QR Code on the canvas. Fallback to `QRCode` deciding the lowest version. */
  const qrCodeRenderToCanvas = () => {
    const text =
      url ||
      neverGonnaGiveYouUpNeverGonnaLetYouDownNeverGonnaRunAroundAndDesertYouNeverGonnaMakeYouCryNeverGonnaSayGoodbyeNeverGonnaTellALieAndHurtYou;

    if (ref.current) {
      if (useLowestVersion) {
        qrCodeRenderLowestVersionToCanvas();
      } else {
        QRCode.toCanvas(ref.current, text, {
          version,
          errorCorrectionLevel,
          margin: 0,
          color: { dark: qrCodeDarkColor, light: qrCodeLightColor },
        }).catch(() => {
          qrCodeRenderLowestVersionToCanvas();
        });
      }
    }
  };

  /**	Download Qr Code to png */
  const qrCodeSaveDataUrlToFile = async () => {
    const text =
      url ||
      neverGonnaGiveYouUpNeverGonnaLetYouDownNeverGonnaRunAroundAndDesertYouNeverGonnaMakeYouCryNeverGonnaSayGoodbyeNeverGonnaTellALieAndHurtYou;

    if (ref.current) {
      const dataUrl = await QRCode.toDataURL(ref.current, text, {
        errorCorrectionLevel,
        version,
        margin: 0,
        color: { dark: qrCodeDarkColor, light: qrCodeLightColor },
      });
      const a = document.createElement("a");
      a.href = dataUrl;
      const d = new Date();
      a.download = `qr-code-${d
        .toISOString()
        .replaceAll(":", "-")
        .replace("T", "_")
        .slice(0, 19)}.${fileType}`;
      a.click();
    }
  };

  const versionFuncButton = (
    <code className="use-lowest-version" onClick={() => setUseLowestVersion(!useLowestVersion)}>
      <small>
        <span className="checkbox">
          <div>{useLowestVersion ? String.fromCodePoint(0x2714) : <>&nbsp;</>}</div>
        </span>
        <Phrase>tools.qrcode.input.version.func</Phrase>
      </small>
    </code>
  );

  return (
    <main className="page p-qr-code">
      <h1>
        <Phrase>tools.qrcode.title</Phrase>
      </h1>

      <section className="inputs">
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
        <Input
          name="fileType"
          value={fileType}
          type="text"
          label="tools.qrcode.input.fileType.label"
          desc={Object.values(QrCodeFileType).join(", ")}
          onClick={() => setPopupIsOpenFileType(true)}
        />
        <div className="toggles">
          <ColorPickerToggle
            toggleOpen={() => setQrCodeDarkColorIsOpen(!qrCodeDarkColorIsOpen)}
            currentColor={qrCodeDarkColor}
          />
          <ColorPickerToggle
            toggleOpen={() => setQrCodeLightColorIsOpen(!qrCodeLightColorIsOpen)}
            currentColor={qrCodeLightColor}
          />
        </div>
      </section>

      <section className="info">
        <h6>{url}</h6>
        <h6>
          <Phrase>tools.qrcode.info.version</Phrase>: {version}
        </h6>
        <button className="button" onClick={qrCodeSaveDataUrlToFile}>
          <Phrase>common.save</Phrase>
        </button>
      </section>

      <section className="qr-code">
        <canvas ref={ref} />
      </section>

      <PopupSelector
        selections={QrCodeFileType}
        selected={fileType}
        select={handleInputFileType}
        isOpen={popupIsOpenFileType}
        close={() => setPopupIsOpenFileType(false)}
      />
      <PopupErrorCorrectionLevel
        inputErrorCorrectionLevel={inputErrorCorrectionLevel}
        popupIsOpenErrorCorrectionLevel={popupIsOpenErrorCorrectionLevel}
        handleInputErrorCorrectionLevel={handleInputErrorCorrectionLevel}
        close={() => setPopupIsOpenErrorCorrectionLevel(false)}
      />
      <ColorPicker
        title="tools.qrcode.input.colorPicker.dark.title"
        isOpen={qrCodeDarkColorIsOpen}
        masterColor={qrCodeDarkHsvColor}
        setMasterColor={setQrCodeDarkHsvColor}
        close={() => setQrCodeDarkColorIsOpen(!qrCodeDarkColorIsOpen)}
      />
      <ColorPicker
        title="tools.qrcode.input.colorPicker.light.title"
        isOpen={qrCodeLightColorIsOpen}
        masterColor={qrCodeLightHsvColor}
        setMasterColor={setQrCodeLightHsvColor}
        close={() => setQrCodeLightColorIsOpen(!qrCodeLightColorIsOpen)}
      />
    </main>
  );
};
