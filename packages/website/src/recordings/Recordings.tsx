import EmbeddedWrapper from "component/EmbeddedWrapper";
import { TopRightSpinner } from "component/Spinner";
import { useRecordings } from "./recordingsDataProvider";
import Infoline from "component/Infoline";
import LazyLoad from "react-lazyload";

const VIDEO_CLASSNAMES =
  "aspect-square w-full bg-light-1 dark:bg-dark-1 border-2 border-light-1 dark:border-dark-1";

export default function Recordings() {
  const { loading, recordings } = useRecordings();

  if (!recordings) {
    return null;
  }

  return (
    <EmbeddedWrapper>
      <TopRightSpinner show={loading} />
      <div className="space-y-16">
        {recordings?.map((recording, i) => {
          const video = (
            <video controls className={VIDEO_CLASSNAMES}>
              <source src={recording.url} type="video/mp4" />
            </video>
          );
          return (
            <div key={recording.url}>
              {i !== 0 ? (
                <LazyLoad
                  once
                  offset={200}
                  placeholder={<div className={VIDEO_CLASSNAMES} />}
                >
                  {video}
                </LazyLoad>
              ) : (
                video
              )}
              <Infoline>{recording.name}</Infoline>
            </div>
          );
        })}
      </div>
    </EmbeddedWrapper>
  );
}
