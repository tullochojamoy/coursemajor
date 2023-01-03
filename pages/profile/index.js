import Link from 'next/link';

export default function profile() {
  return (
    <>
      <section
        className='u-align-center u-clearfix u-image u-shading u-section-1'
        id='carousel_6e31'
        data-image-width='1280'
        data-image-height='963'
      >
        <div className='u-clearfix u-sheet u-sheet-1'>
          <h2 className='u-custom-font u-font-montserrat u-text u-text-default u-text-1'>
            Profile
          </h2>
        </div>
      </section>
      <section
        className='u-align-center u-clearfix u-gradient u-section-2'
        id='carousel_75d8'
      >
        <div className='u-clearfix u-sheet u-sheet-1'>
          <h2 className='u-align-center u-text u-text-default u-text-1'>
            We&apos;ll help manage your business
          </h2>
          <div className='u-expanded-width u-list u-list-1'>
            <div className='u-repeater u-repeater-1'>
              <Link href='/'>
                <a className='u-align-center u-container-style u-custom-item u-list-item u-palette-1-light-1 u-radius-20 u-repeater-item u-shape-round u-video-cover u-list-item-1'>
                  <div className='u-container-layout u-similar-container u-valign-top u-container-layout-1'>
                    <h4 className='u-custom-item u-text u-text-2'>
                      COURSEMAJOR
                    </h4>
                    <span className='u-align-center-lg u-align-center-md u-align-center-sm u-align-center-xs u-custom-item u-file-icon u-icon u-opacity u-opacity-65 u-text-white u-icon-1'>
                      <img src='/images/95.png' alt='' />
                    </span>
                  </div>
                </a>
              </Link>
              <Link href='/profile/editprofile'>
                <a className='u-align-center u-container-style u-custom-item u-list-item u-radius-20 u-repeater-item u-video-cover u-white u-list-item-2'>
                  <div className='u-container-layout u-similar-container u-valign-top u-container-layout-2'>
                    <h4 className='u-custom-item u-text u-text-palette-2-light-1 u-text-3'>
                      EDIT PROFILE
                    </h4>
                    <span className='u-align-center-lg u-align-center-md u-align-center-sm u-align-center-xs u-custom-item u-file-icon u-icon u-opacity u-opacity-55 u-text-palette-2-light-1 u-icon-2'>
                      <img src='/images/96.png' alt='' />
                    </span>
                  </div>
                </a>
              </Link>
              <Link href='/profile/notifications'>
                <a className='u-align-center u-container-style u-custom-item u-list-item u-palette-4-base u-radius-20 u-repeater-item u-shape-round u-video-cover u-list-item-3'>
                  <div className='u-container-layout u-similar-container u-valign-top u-container-layout-3'>
                    <h4 className='u-custom-item u-text u-text-4'>
                      NOTIFICATIONS
                    </h4>

                    <span className='u-align-center-lg u-align-center-md u-align-center-sm u-align-center-xs u-custom-item u-icon u-icon-rectangle u-opacity u-opacity-55 u-text-white u-icon-3'>
                      <svg
                        className='u-svg-link'
                        preserveAspectRatio='xMidYMin slice'
                        viewBox='0 0 512.001 512.001'
                      >
                        <use
                          xmlnsXlink='http://www.w3.org/1999/xlink'
                          xlinkHref='#svg-28d0'
                        ></use>
                      </svg>
                      <svg
                        className='u-svg-content'
                        viewBox='0 0 512.001 512.001'
                        x='0px'
                        y='0px'
                        id='svg-28d0'
                        style={{ enableBackground: 'new 0 0 512.001 512.001' }}
                      >
                        <g>
                          <g>
                            <path d='M446.977,201.914L277.316,32.253c-17.539-17.54-46.081-17.541-63.622,0c-15.768,15.767-17.126,39.814-5.482,56.985    l-0.236,1.181c-12.232,61.165-42.011,116.809-86.12,160.917l-77.819,77.819c-17.582,17.583-17.585,46.039,0,63.622l42.414,42.414    c17.581,17.582,46.039,17.583,63.622,0l10.604-10.604l74.226,74.226c17.582,17.583,46.038,17.584,63.621,0    c17.541-17.54,17.541-46.081,0-63.621l-31.811-31.811l10.604-10.604c17.582-17.581,17.584-46.037,0-63.621l-7.206-7.207    c35.449-24.819,75.708-42.098,118.701-50.697l1.196-0.239c17.553,11.851,41.544,9.946,56.969-5.479h0.001    C464.516,247.995,464.516,219.455,446.977,201.914z M128.866,413.984c-5.86,5.859-15.348,5.86-21.208-0.001l-42.414-42.414    c-5.861-5.862-5.861-15.346,0-21.207l74.225-74.226l63.622,63.622C195.829,347.02,136.307,406.542,128.866,413.984z     M277.316,456.398c5.846,5.846,5.846,15.36,0,21.207c-5.846,5.846-15.361,5.846-21.207,0l-74.226-74.226l21.208-21.207    L277.316,456.398z M224.298,360.965c4.508-4.508,11.256-11.413,21.906-20.509l9.905,9.906c5.861,5.861,5.861,15.345,0,21.207    l-10.604,10.604L224.298,360.965z M224.935,319.189l-64.898-64.898c34.779-40.159,59.685-87.564,73.01-139.064l130.952,130.952    C312.499,259.503,265.095,284.409,224.935,319.189z M425.767,244.326c-5.861,5.86-15.346,5.86-21.207,0L234.901,74.667    c-5.861-5.862-5.861-15.346,0-21.207c5.861-5.861,15.347-5.861,21.208,0l169.658,169.658    C431.613,228.965,431.613,238.478,425.767,244.326z'></path>
                          </g>
                        </g>
                        <g>
                          <g>
                            <path d='M150.072,329.154c-5.855-5.856-15.351-5.856-21.207,0l-21.207,21.207c-5.856,5.856-5.856,15.351,0,21.207    c5.855,5.856,15.352,5.856,21.207,0l21.207-21.207C155.928,344.505,155.928,335.01,150.072,329.154z'></path>
                          </g>
                        </g>
                        <g>
                          <g>
                            <path d='M346.19,0c-8.282,0-14.996,6.714-14.996,14.996v29.992c0,8.282,6.714,14.996,14.996,14.996s14.996-6.714,14.996-14.996    V14.996C361.186,6.714,354.472,0,346.19,0z'></path>
                          </g>
                        </g>
                        <g>
                          <g>
                            <path d='M466.157,119.966h-29.992c-8.282,0-14.996,6.714-14.996,14.996s6.714,14.996,14.996,14.996h29.992    c8.282,0,14.996-6.714,14.996-14.996S474.438,119.966,466.157,119.966z'></path>
                          </g>
                        </g>
                        <g>
                          <g>
                            <path d='M446.769,34.383c-5.855-5.856-15.351-5.856-21.207,0L395.57,64.375c-5.856,5.856-5.856,15.351,0,21.207    c5.855,5.856,15.351,5.857,21.207,0l29.992-29.992C452.625,49.734,452.625,40.24,446.769,34.383z'></path>
                          </g>
                        </g>
                      </svg>
                    </span>
                  </div>
                </a>
              </Link>
              <Link href='/profile/sociallinks'>
                <a className='u-align-center u-container-style u-custom-item u-list-item u-radius-20 u-repeater-item u-white u-list-item-4'>
                  <div className='u-container-layout u-similar-container u-valign-top u-container-layout-4'>
                    <h4 className='u-custom-item u-text u-text-palette-1-base u-text-5'>
                      Socials
                    </h4>
                    <span className='u-align-center-lg u-align-center-md u-align-center-sm u-align-center-xs u-custom-item u-file-icon u-icon u-opacity u-opacity-55 u-text-palette-1-base u-icon-4'>
                      <img src='/images/97.png' alt='' />
                    </span>
                  </div>
                </a>
              </Link>
              <Link href='/profile/closeaccount'>
                <a className='u-align-center u-container-style u-custom-item u-list-item u-palette-2-light-1 u-radius-20 u-repeater-item u-shape-round u-video-cover u-list-item-5'>
                  <div className='u-container-layout u-similar-container u-valign-top u-container-layout-5'>
                    <h4 className='u-custom-item u-text u-text-6'>
                      close account
                    </h4>
                    <span className='u-align-center-lg u-align-center-md u-align-center-sm u-align-center-xs u-custom-item u-file-icon u-icon u-opacity u-opacity-55 u-icon-5'>
                      <img src='/images/694604.png' alt='' />
                    </span>
                  </div>
                </a>
              </Link>
              <Link href='/profile/paypal'>
                <a className='u-align-center u-container-style u-custom-item u-list-item u-radius-20 u-repeater-item u-video-cover u-white u-list-item-6'>
                  <div className='u-container-layout u-similar-container u-valign-top u-container-layout-6'>
                    <h4 className='u-custom-item u-text u-text-palette-4-base u-text-7'>
                      PAYPAL
                    </h4>
                    <span className='u-align-center-lg u-align-center-md u-align-center-sm u-align-center-xs u-custom-item u-file-icon u-icon u-opacity u-opacity-55 u-text-palette-4-base u-icon-6'>
                      <img src='/images/98.png' alt='' />
                    </span>
                  </div>
                </a>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}