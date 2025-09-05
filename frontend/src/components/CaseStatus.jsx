const CaseStatus = () => {
  return (
    <section className="min-h-screen w-full flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-5xl mx-auto">
        <h1 className="text-center text-4xl font-extrabold tracking-tight text-primary mb-8">
          Case Status
        </h1>

        <div className="grid gap-6 items-stretch lg:grid-cols-[1fr_auto_1fr]">
          {/* Card-1 */}
          <div className="card flex-1 h-full self-stretch bg-base-100/90 shadow-xl hover:shadow-2xl transition duration-200 rounded-2xl border border-base-200">
            <div className="card-body h-full flex flex-col items-center text-center gap-4">
              <h2 className="card-title">Search By Case Type</h2>

              <div className="flex-1 w-full flex flex-col items-center justify-center gap-4">
                <div className="form-control w-full max-w-sm mx-auto">
                  <label className="floating-label text-center">
                    <span>Your Email</span>
                    <input
                      type="text"
                      placeholder="mail@site.com"
                      className="input input-bordered w-full"
                    />
                  </label>
                </div>

                <div className="form-control w-full max-w-sm mx-auto">
                  <label className="floating-label text-center">
                    <span>Number</span>
                    <input
                      type="text"
                      placeholder="1234XXXXXX"
                      className="input input-bordered w-full"
                    />
                  </label>
                </div>
              </div>

              <div className="card-actions justify-center pt-2">
                <button className="btn btn-primary">Search</button>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="divider lg:divider-horizontal m-0 opacity-70 self-stretch flex items-center">
            or
          </div>

          {/* Card-2 */}
          <div className="card flex-1 h-full self-stretch bg-base-100/90 shadow-xl hover:shadow-2xl transition duration-200 rounded-2xl border border-base-200">
            <div className="card-body h-full flex flex-col items-center text-center gap-4">
              <h2 className="card-title">Search By CNR Number</h2>

              <div className="flex-1 w-full flex flex-col items-center justify-center">
                <div className="form-control w-full max-w-sm mx-auto">
                  <label className="floating-label text-center">
                    <span>CNR Number</span>
                    <input
                      type="text"
                      placeholder="XXXX XXXX XXXX XXXX"
                      className="input input-bordered w-full"
                    />
                  </label>
                </div>
              </div>
              <div className="card-actions justify-center pt-2">
                <button className="btn btn-primary">Search</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CaseStatus;
