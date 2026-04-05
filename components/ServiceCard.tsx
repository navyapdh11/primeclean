'use client';

import Link from 'next/link';
import Image from 'next/image';

interface ServiceProps {
  service: {
    id: string;
    name: string;
    description: string;
    price_cents: number;
    duration: string;
    image?: string;
  };
}

export default function ServiceCard({ service }: ServiceProps) {
  const price = (service.price_cents / 100).toFixed(2);

  return (
    <div className="card overflow-hidden flex flex-col">
      {service.image && (
        <div className="relative h-48 w-full bg-gray-200">
          <Image
            src={service.image}
            alt={service.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        </div>
      )}
      <div className="p-6 flex-1 flex flex-col">
        <h3 className="text-xl font-semibold mb-2">{service.name}</h3>
        <p className="text-gray-600 mb-4 flex-1">{service.description}</p>
        <div className="flex items-center justify-between mt-auto">
          <div>
            <span className="text-2xl font-bold text-primary-600">${price}</span>
            <span className="text-sm text-gray-500 ml-1">/ session</span>
          </div>
          <span className="text-sm text-gray-500">{service.duration}</span>
        </div>
        <Link href={`/book?service=${service.id}`} className="btn-primary mt-4 text-center">
          Book This Service
        </Link>
      </div>
    </div>
  );
}
