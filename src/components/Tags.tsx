import services from '@/utils/service';
import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';
import LabeledContainer from './LabeledContainer';
import TagBadge from './TagBadge';

interface ITags {
  updateTags: (tag_id: string) => void;
}

const Tags = ({ updateTags }: ITags) => {
  const [tags, setTags] = useState<Tag[]>([]);
  useEffect(() => {
    const getTags = async () => {
      const { error, data, message } = await services.getTags();

      if (error) {
        toast(message);
      }
      if (data) {
        setTags(data);
      }
    };

    getTags();
  }, []);

  return (
    <div>
      <LabeledContainer label="Choose Tags" className="flex mt-5 gap-1">
        {tags.map((tag) => (
          <TagBadge
            updateTags={updateTags}
            key={tag.tag_id}
            tag_id={tag.tag_id}
            name={tag.name}
          />
        ))}
      </LabeledContainer>
    </div>
  );
};

export default Tags;
