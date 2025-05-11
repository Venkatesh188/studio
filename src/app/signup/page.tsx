export default function SignupPage() {
  return (
    <div className="container mx-auto flex min-h-[calc(100vh-10rem)] items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md text-center">
        <h1 className="text-3xl font-bold text-primary mb-4">Sign Up</h1>
        <p className="text-lg">Account creation is managed via the <a href="/admin" className="text-blue-600 underline">Admin Panel</a> using your GitHub account.</p>
      </div>
    </div>
  );
}
