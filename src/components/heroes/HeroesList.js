import { HeroItem } from "./HeroItem";

export const HeroesList = ({ heroIds, listType }) => {
  return (
    <div>
      {heroIds.map((heroId) => (
        <div key={`${listType}-${heroId}`}>
          <HeroItem heroId={heroId} type={listType} />
        </div>
      ))}
    </div>
  );
};
