Rails.configuration.middleware.use Browser::Middleware do
  browser = Browser.new(request.user_agent)
  redirect_to root_path if browser.device.mobile?
end