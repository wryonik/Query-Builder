const TabGroup = ({ options, selectedTab, setSelectedTab }: any) => {
  return (
    <div className="text-left flex flex-row mb-7">
      {options.map((option: any) => {
        return (
          <div
            key={option}
            className={`text-sm transition-all font-semibold ${
              selectedTab === option ? "bg-tabgroupVoilet" : "bg-lightGrey"
            } py-1 px-2 first:rounded-l last:rounded-r`}
            onClick={() => {
              setSelectedTab(option);
            }}
          >
            {option}
          </div>
        );
      })}
    </div>
  );
};

export default TabGroup;
