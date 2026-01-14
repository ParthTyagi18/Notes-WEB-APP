import {Zap} from "lucide-react"
const RateLimitedUI = () => {
    return (
        <div className="flex items-center justify-center min-h-[200px] w-full bg-transparent p-4">
      {/* Main Card Container */}
      <div className="flex w-full max-w-2xl gap-4 p-6 bg-[#1a2e1a] border border-green-900/50 rounded-xl">
        
        {/* Icon Circle */}
        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-green-900/30 flex-shrink-0">
          <Zap className="w-6 h-6 text-green-500 fill-green-500" />
        </div>

        {/* Text Content */}
        <div className="flex flex-col gap-1">
          <h3 className="text-xl font-semibold text-gray-100">
            Rate Limit Reached
          </h3>
          <p className="text-sm leading-relaxed text-gray-400">
            You've made too many requests in a short period. Please wait a moment.
            <br />
            Try again in a few seconds for the best experience.
          </p>
        </div>
        
      </div>
    </div>
  );
}

export default RateLimitedUI