import { Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t bg-muted/30 mt-auto">
      <div className="container-custom py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-sm text-muted-foreground">
            <p>© 2026. Built with <Heart className="inline h-4 w-4 text-red-500 fill-red-500" /> using{' '}
              <a 
                href="https://caffeine.ai" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary hover:underline font-medium"
              >
                caffeine.ai
              </a>
            </p>
          </div>
          <div className="text-sm text-muted-foreground">
            <p>Empowering farmers, connecting communities</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
