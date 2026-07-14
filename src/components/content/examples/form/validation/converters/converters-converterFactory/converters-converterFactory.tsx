import { IntlDateTimeConverter } from 'ojs/ojconverter-datetime';
import { IntlNumberConverter } from 'ojs/ojconverter-number';
import 'preact';
import { useState } from 'preact/hooks';

export const ConvertersConverterFactory = () => {
  const salOptions: IntlNumberConverter.ConverterOptions = {
      style: 'currency',
      currency: 'USD'
  };
  const salaryConverter = new IntlNumberConverter(salOptions);
  const dateOptions: IntlDateTimeConverter.ConverterOptions = {
      formatType: 'date',
      dateFormat: 'medium'
  };
  const dateConverter = new IntlDateTimeConverter(dateOptions);

  const [amySalary, setAmySalary] = useState<string>(salaryConverter.format(125475.0));
  const [garySalary, setGarySalary] = useState<string>(salaryConverter.format(110325.25));
  const [amyStartDate, setAmyStartDate] = useState<string | null>(dateConverter.format('2014-01-02'));
  const [garyStartDate, setGaryStartDate] = useState<string | null>(dateConverter.format('2009-07-25'));

  return (
      <table id="converter-factory-example" class="demo-recipe-table demo-recipe-spacing">
            <tbody>
                    <tr>
                              <td>
                                          <div class="oj-panel oj-bg-danger-30 demo-panel-customizations">
                                                        <h3 class="oj-header-border">Amy Flanagan</h3>
                                                        <img src="../images/Amy.png" alt="Amy" />
                                                        <p>Product Manager</p>
                                                        <span>
                                                                        <b>Salary</b>
                                                                        :
                                                                        <span id="amysalary">{amySalary}</span>
                                                                    </span>
                                                        <br />
                                                        <span>
                                                                        <b>Joined</b>
                                                                        :
                                                                        <span id="amystartdate">{amyStartDate}</span>
                                                                    </span>
                                                        <br />
                                                    </div>
                                      </td>
                              <td>
                                          <div class="oj-panel oj-bg-info-30 demo-panel-customizations">
                                                        <h3 class="oj-header-border">Gary Fontaine</h3>
                                                        <img src="../images/Gary.png" alt="Gary" />
                                                        <p>Sales Associate</p>
                                                        <span>
                                                                        <b>Salary</b>
                                                                        :
                                                                        <span id="garaysalary">{garySalary}</span>
                                                                    </span>
                                                        <br />
                                                        <span>
                                                                        <b>Joined</b>
                                                                        :
                                                                        <span id="garystartdate">{garyStartDate}</span>
                                                                    </span>
                                                        <br />
                                                    </div>
                                      </td>
                          </tr>
                </tbody>
        </table>
    );
};

export default ConvertersConverterFactory;
