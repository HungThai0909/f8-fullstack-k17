import React from 'react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {cn} from "../../lib/utils"

export default function Footer() {
  return (
    <div className='mt-12'>
      <div className='bg-gray-200 py-20'>
        <div className='max-w-350 mx-auto'>
          <div className="flex gap-4">
            <div className="basis-1/3 flex flex-col gap-6 items-start">
              <img className='h-full cursor-pointer' src="/LOGO 2.png" alt="" />
              <div className='flex justify-center gap-2'>
                <a href='#' className='block px-5 py-2 rounded-sm transition-all duration-150'>
                  <img className='w-[400px]' src="../../../public/mobile-img/app.png" alt="apple.png" />
                </a>
              </div>
              <p className='text-[15px]'>Company # 490039-445, Registered with House of companies.</p>
            </div>
            <div className="basis-1/3 gap-6 items-start flex flex-col">
              <h3 className='text-[16px] font-bold text-gray-900'>Get Exclusive Deals in your Inbox</h3>
              <div className='relative w-100 h-14'>
                <Input className={cn("w-full h-full rounded-full bg-gray-300 pl-6")} placeholder="youremail@gmail.com"/>
                <Button className={cn("absolute right-0 text-white font-semibold bg-orange-500 rounded-full h-full px-14 hover:cursor-pointer")}>Subscribe</Button>
              </div>
              <p className='text-sm'>we wont spam, read our <a href='#' className='underline hover:cursor-pointer text-orange-500 hover:text-orange-800 transition-all duration-150'>email policy</a></p>
              <div className='flex gap-2'>
                <a className='w-8 aspect-square hover:-translate-y-1 transition-all duration-150 ease-in block' href="#"><img src="../../../public/footer-img/Facebook.png" alt="Facebook" /></a>
                <a className='w-8 aspect-square hover:-translate-y-1 transition-all duration-150 ease-in block' href="#"><img src="../../../public/footer-img/Instagram.png" alt="Instagram" /></a>
                <a className='w-8 aspect-square hover:-translate-y-1 transition-all duration-150 ease-in block' href="#"><img src="../../../public/footer-img/TikTok.png" alt="TikTok" /></a>
                <a className='w-8 aspect-square hover:-translate-y-1 transition-all duration-150 ease-in block' href="#"><img src="../../../public/footer-img/Snapchat.png" alt="Snapchat" /></a>
              </div>
            </div>
            <div className="basis-1/6 flex flex-col gap-6">
              <h3 className='text-[16px] font-bold text-gray-900'>Legal Pages</h3>
              <a href="#" className='underline hover:text-orange-500 transition-all duration-150'>Terms and conditions</a>
              <a href="#" className='underline hover:text-orange-500 transition-all duration-150'>Privacy</a>
              <a href="#" className='underline hover:text-orange-500 transition-all duration-150'>Cookies</a>
              <a href="#" className='underline hover:text-orange-500 transition-all duration-150'>Modern Slavery Statement</a>
            </div>
            <div className="basis-1/6 flex flex-col gap-6">
            <h3 className='text-[16px] font-bold text-gray-900'>Important Links</h3>
              <a href="#" className='underline hover:text-orange-500 transition-all duration-150'>Get help</a>
              <a href="#" className='underline hover:text-orange-500 transition-all duration-150'>Add your restaurant</a>
              <a href="#" className='underline hover:text-orange-500 transition-all duration-150'>Sign up to deliver</a>
              <a href="#" className='underline hover:text-orange-500 transition-all duration-150'>Create a business account</a>
            </div>
          </div>
        </div>
      </div>

      <div className='bg-black px-20 flex py-7.5'>
        <div className="basis-1/2 text-white">Order.uk Copyright 2024, All Rights Reserved.</div>
        <div className="basis-1/2 text-white flex gap-8">
          <p>Privacy Policy</p>
          <p>Terms</p>
          <p>Pricing</p>
          <p>Do not sell or share my personal information</p>
        </div>
      </div>
    </div>
  )
}