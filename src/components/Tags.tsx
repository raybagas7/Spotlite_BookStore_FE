import React, { useEffect } from 'react';
import LabeledContainer from './LabeledContainer';
import TagBadge from './TagBadge';
import { useTag } from '@/store/useTag';

interface ITags {
  updateTags: (tag_id: string) => void;
}

const Tags = ({ updateTags }: ITags) => {
  const { tags, getTags } = useTag();
  useEffect(() => {
    if (!tags) {
      getTags();
    }
  }, [tags, getTags]);

  if (!tags) {
    return null;
  }

  return (
    <div>
      <LabeledContainer
        label={
          <p>
            Choose Tags
            <span className="text-red-500">*</span>
          </p>
        }
        className="mt-5"
      >
        <div className="flex gap-1 flex-wrap">
          {tags.map((tag) => (
            <TagBadge
              updateTags={updateTags}
              key={tag.tag_id}
              tag_id={tag.tag_id}
              name={tag.name}
            />
          ))}
        </div>
      </LabeledContainer>
    </div>
  );
};

export default Tags;
