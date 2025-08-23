"use client"

import { Button } from '@/components/ui/button'
import Image from 'next/image'
import React from 'react'
import { Input } from './ui/input'
import { ChevronRight } from 'lucide-react'

const Hero = () => {
  
  return (
    <div className='relative min-h-screen flex items-center justify-center text-white'>
        <Image 
            src="/images/background.jpg"
            alt="Hero Image"
            fill
            className="object-cover"
            priority
        />
        <div className='absolute inset-0 bg-black/60'/>

        <div className='relative z-10 text-center px-4 max-w-2xl mx-auto'>
            <h1 className='text-4xl sm:text-5xl md:text-6xl font-bold mb-4'>
                Peliculas y series ilimitadas y mucho más.
            </h1>
            <p className='text-xl sm:text-2xl mb-6'>
                A partir de USD 3,99. Cancela cuando quieras.
            </p>
            <p className='text-lg sm:text-xl mb-4 text-white'>¿Quieres ver Netflix ya? Ingresa tu email para crear una cuenta o reiniciar tu membresía de Netflix.</p>
            <form action="" className='flex flex-col sm:flex-row gap-4 max-w-[600px] mx-auto'>
                <Input 
                    type="email"
                    placeholder="Ingresa tu email"
                    className="flex-grow h-14 bg-black/40 border-gray-600 text-white placeholder:text-gray-400"
                    required
                />
                <Button type='submit' size="lg" className='h-14 px-8 bg-red-600 hover:bg-red-700 text-white text-xl'>
                    Comenzar
                    <ChevronRight className='w-6 h-6 ml-2'/>
                </Button>
            </form>
        </div>
    </div>
  )
}

export default Hero