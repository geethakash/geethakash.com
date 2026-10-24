"use client";

import { Reveal, Section } from "../components/ui";
import { operatingConditions, specs } from "../lib/content";

export default function StackSection() {
  return (
    <Section
      id="stack"
      index={4}
      term="Specifications"
      title="Stack"
      intro="The tools I reach for, grouped the way a datasheet groups its parameters."
    >
      <div className="flex flex-col gap-14">
        <Reveal>
          <h3 className="label mb-4">Electrical characteristics</h3>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="border-y border-rule-strong">
                  <th scope="col" className="label w-[38%] py-3 pr-4 font-normal sm:w-[14rem] sm:pr-6">
                    Parameter
                  </th>
                  <th scope="col" className="label py-3 font-normal">
                    Value
                  </th>
                </tr>
              </thead>
              <tbody>
                {specs.map((row) => (
                  <tr key={row.parameter} className="border-b border-rule transition-colors hover:bg-panel">
                    <th scope="row" className="py-4 pr-4 align-baseline font-semibold sm:pr-6">
                      {row.parameter}
                    </th>
                    <td className="py-4 align-baseline">
                      <ul className="flex flex-wrap gap-x-4 gap-y-1 font-mono text-sm sm:gap-x-5">
                        {row.values.map((value) => (
                          <li key={value}>{value}</li>
                        ))}
                      </ul>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Reveal>

        <Reveal>
          <h3 className="label mb-4">Recommended operating conditions</h3>
          <dl className="grid grid-cols-2 gap-px border border-rule bg-rule md:grid-cols-4">
            {operatingConditions.map((row) => (
              <div key={row.parameter} className="flex flex-col gap-1 bg-paper p-4">
                <dt className="label">{row.parameter}</dt>
                <dd className="font-mono text-sm">{row.value}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </Section>
  );
}
