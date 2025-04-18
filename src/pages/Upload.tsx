
import Navbar from '@/components/Navbar';
import UploadForm from '@/components/UploadForm';

const Upload = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="max-w-7xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">Upload a Photo</h1>
        <UploadForm />
      </main>
    </div>
  );
};

export default Upload;
