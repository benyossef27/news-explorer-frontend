export default function Preloader(props) {
  const { isPreloaderOpen } = props;

  return (
    <div className={`preloader ${isPreloaderOpen && "preloader_active"}`}></div>
  );
}
