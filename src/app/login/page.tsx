import React from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'

export default function Page() {
  return (
    <div className="relative min-h-screen text-white">
      <div className="absolute inset-0 -z-10">
        <Image
          src="/images/background.jpg"
          alt="Hero Image"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/50" />
      </div>

      <header className="w-full px-4 py-5 bg-transparent">
        <Image
          src="/images/Netflix_Logo_PMS.png"
          alt="Netflix Logo"
          width={188}
          height={30}
          className="ml-28 -mt-4 object-contain"
        />
      </header>

      <main className="pt-10 px-4 flex justify-center">
        <div className="bg-black/80 rounded-sm p-15 w-auto h-auto">
          <h1 className="text-4xl text-white font-bold mt-1 mb-3">Iniciar sesión</h1>
          <form>
            <input type="text" placeholder='Email o número de celular'
            className='mt-8 w-full h-15 p-4 bg-gray-950/50 text-xl text-white placeholder-gray-300 border border-gray-400 rounded-sm'/>
            <input type="password" placeholder='Contraseña'
            className='mt-8 w-full h-15 p-4 bg-gray-950/50 text-xl text-white placeholder-gray-300 border border-gray-400 rounded-sm'/>
          </form>
          <Button className="bg-red-600 hover:bg-red-700 rounded-sm text-white p-6 h-10 w-full text-xl font-semibold flex items-center justify-center mt-8">
            Iniciar sesión
          </Button>
          <h2 className='text-2xl text-gray-400 m-5 justify-center text-center'> O </h2>
          <Button className="bg-zinc-500/40 hover:bg-zinc-600/40 rounded-sm text-white p-6 h-10 w-full text-xl font-semibold flex items-center justify-center mt-8">
            Usar un código de inicio de sesión
          </Button>
          <p className='text-xl m-4 text-white underline justify-center text-center cursor-pointer hover:text-gray-300'>
            ¿Olvidaste la contraseña?
          </p>
          {/* <input type='checkbox' className='appearance-none h-6 w-6 bg-black border border-gray-500 rounded-xs cursor-pointer hover:border-white checked:bg-gray-500 focus:outline-none transition-colors duration-100'/> */}
          <div className='flex justify-start'>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="peer appearance-none h-6 w-6 bg-black border border-gray-500 rounded-xs cursor-pointer hover:border-white checked:bg-white focus:outline-none transition-colors duration-200"
              />
              <svg
                className="absolute left-0 top-0 w-6 h-6 text-black pointer-events-none opacity-0 peer-checked:opacity-100 transition-opacity duration-100"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </label>
            <p className='text-white text-xl ml-4'>Recordarme</p>
          </div>
          <div className='flex justify-start mt-2 mb-2'>
            <p className='text-gray-400 text-xl'>¿Primera vez en Netflix?</p>
            <p className='text-white text-xl font-bold'>Suscríbete ya.</p>
          </div>
          <p className='mt-3 text-gray-500 text-lg leading-relaxed max-w-md break-words'>Esta página está protegida por Google reCAPTCHA para comprobar que no eres un robot.</p>
          <p className='text-lg mt-3 mb-3 text-blue-500 underline'>
            Más info
          </p>
        </div>
      </main>
    </div>
  )
}


