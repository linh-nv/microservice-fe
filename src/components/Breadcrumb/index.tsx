import React, { ReactNode } from "react";
import { Breadcrumb as BreadcrumbAntd } from "antd";
import classNames from "classnames";
import { FaArrowLeftLong } from "react-icons/fa6";

interface BreadcrumbItemType {
  title: ReactNode;
  href?: string;
  onClick?: () => void;
  icon?: ReactNode;
  className?: string;
}

interface BreadcrumbProps {
  title: string;
  items: BreadcrumbItemType[];
  className?: string;
  separator?: ReactNode;
  style?: React.CSSProperties;
  onBack?: () => void;
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({
  title,
  items,
  className,
  separator = "/",
  style,
  onBack,
}) => {
  return (
    <div className="flex items-start py-2 gap-5">
      <FaArrowLeftLong
        onClick={onBack}
        className="opacity-50 cursor-pointer pt-1"
        size={18}
      />
      <div className="flex flex-col">
        <BreadcrumbAntd
          style={style}
          className={classNames(className)}
          separator={separator}
          items={items}
        />
        <h2 className="text-lg font-bold">{title}</h2>
      </div>
    </div>
  );
};

export default Breadcrumb;
