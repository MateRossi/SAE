import './page.css';

function PageTemplate({ pageTitle, subtitle, children }) {
    return (
        <div className='page'>
            <h1 className='pageTitle'>{pageTitle}</h1>
            <main className="pageContent">
                <p className='page-subtitle'>
                    {subtitle}
                </p>
                {children}
            </main>
        </div>
    )
}

export default PageTemplate;