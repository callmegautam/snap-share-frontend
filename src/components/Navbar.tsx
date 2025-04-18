
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Camera, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface NavbarProps {
  onSearch?: (query: string) => void;
}

const Navbar = ({ onSearch }: NavbarProps) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(searchQuery);
    }
  };

  return (
    <nav className="border-b border-gray-200 py-4 px-6 bg-white sticky top-0 z-10">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link 
          to="/" 
          className="flex items-center space-x-2 text-primary font-bold text-xl"
        >
          <Camera className="h-6 w-6" />
          <span>SnapShare</span>
        </Link>
        
        {onSearch && (
          <form onSubmit={handleSearch} className="hidden sm:flex max-w-md flex-1 mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                type="search"
                placeholder="Search photos, tags, or users..."
                className="w-full pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </form>
        )}
        
        <div className="flex space-x-2 items-center">
          <Link to="/upload">
            <Button variant="outline">
              <Camera className="h-4 w-4 mr-2" />
              Upload
            </Button>
          </Link>
        </div>
      </div>
      
      {onSearch && (
        <form onSubmit={handleSearch} className="sm:hidden mt-4">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              type="search"
              placeholder="Search..."
              className="w-full pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </form>
      )}
    </nav>
  );
};

export default Navbar;
