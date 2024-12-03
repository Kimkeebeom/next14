import React from "react";
import * as S from '@/app/styles/scroll/scrollStyles';
import Image from 'next/image';

const Header: React.FC = () => {
    return (
        <section>
          <S.Intro>
              <S.IntroLogo>
                  <S.Logo data-aos="fade-down" data-aos-duration="1500">Logo</S.Logo>
              </S.IntroLogo>
              <S.IntroContentGroup>
                <div data-aos="zoom-out-down" data-aos-duration="1500">
                  <S.IntroLight>
                    <S.introLight1>
                      <Image src='/images/nationalGeographic/intro-light-1.png' alt={'star'} 
                        width={77} height={69} data-aos="fade-down" data-aos-duration="1500" 
                        data-aos-delay="300"
                      />
                    </S.introLight1>
                    <S.introLight2>
                      <Image src='/images/nationalGeographic/intro-light-2.png' alt={'star'} 
                        width={77} height={70} data-aos="fade-down" data-aos-duration="1500" 
                        data-aos-delay="600"
                      />
                    </S.introLight2>
                  </S.IntroLight>
                  <S.introSale data-aos="fade-up" data-aos-duration="1500">
                    <h3 className='sale-per'>UP TO 71% OFF</h3>
                    <p className='sale-date'>11.18 00:00 - 11.29 10:00</p>
                    <div className='logo-flex' style={{display: "flex"}}>
                      <S.ngLogo>
                        <Image src={'/images/nationalGeographic/ng-logo.png'} alt={'brand-logo'} width={119} height={35}/>
                      </S.ngLogo>
                      <S.mgLogo>
                        <Image src={'/images/nationalGeographic/mg-logo.png'} alt={'brand-logo'} width={121} height={31}/>
                      </S.mgLogo>
                      <S.brtLogo>
                        <Image src={'/images/nationalGeographic/brt-logo.png'} alt={'brand-logo'} width={80} height={30.97}/>
                      </S.brtLogo>
                    </div>
                  </S.introSale>
                </div>
              </S.IntroContentGroup>
          </S.Intro>
      </section>
    )
}

export default Header;