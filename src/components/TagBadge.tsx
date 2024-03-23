import React, { useState } from 'react';
import { Badge } from './ui/badge';

interface ITagBadge {
  name: string;
  tag_id: string;
  updateTags: (tag_id: string) => void;
}

const TagBadge = ({ name, tag_id, updateTags }: ITagBadge) => {
  const [choosenTag, setChoosenTag] = useState<boolean>(false);

  const onToggleTag = () => {
    setChoosenTag((prev) => !prev);
    updateTags(tag_id);
  };

  return (
    <Badge
      onClick={onToggleTag}
      className="cursor-pointer"
      variant={choosenTag ? 'default' : 'secondary'}
    >
      {name}
    </Badge>
  );
};

export default TagBadge;
