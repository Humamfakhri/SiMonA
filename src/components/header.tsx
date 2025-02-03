import ProfileBtn from "./profile-btn";
import SearchInput from "./search-input";

export default function Header() {
  return (
    <header className="flex items-center justify-between">
      <h1 className="text-2xl font-bold">Simona</h1>
      {/* <div className="flex items-center gap-3">
        <SearchInput />
        <ProfileBtn/>
      </div> */}
    </header>
  )
}
