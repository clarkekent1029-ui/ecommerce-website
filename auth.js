// auth.js
document.addEventListener("DOMContentLoaded", function() {
    const isLoggedIn = localStorage.getItem('is_logged_in');
    const userEmail = localStorage.getItem('user_email');
    const userId = localStorage.getItem('user_id');

    // 1. Push User-ID to Data Layer if logged in
    if (isLoggedIn && userId) {
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
            'event': 'user_login_state',
            'user_id': userId
        });
    }

    // 2. Inject dynamic navigation bar at the top of the page
    const headerHTML = `
        <nav style="display: flex; justify-content: space-between; align-items: center; padding: 15px 30px; background: #1a1a1a; color: #fff; font-family: sans-serif;">
            <div><a href="index.html" style="color: #fff; text-decoration: none; font-weight: bold;">MyStore</a></div>
            <div>
                ${isLoggedIn 
                    ? `<span style="margin-right: 15px;">👤 ${userEmail}</span> <button id="logout-btn" style="padding: 5px 10px; background: #ff4d4d; color: #fff; border: none; cursor: pointer; border-radius: 4px;">Logout</button>` 
                    : `<a href="login.html" style="color: #fff; text-decoration: none; padding: 5px 10px; background: #007bff; border-radius: 4px;">Login</a>`}
            </div>
        </nav>
    `;

    document.body.insertAdjacentHTML('afterbegin', headerHTML);

    // 3. Handle Logout action
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function() {
            localStorage.removeItem('is_logged_in');
            localStorage.removeItem('user_email');
            localStorage.removeItem('user_id');
            window.location.href = 'index.html';
        });
    }
});

